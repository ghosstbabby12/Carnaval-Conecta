package com.carnaval.controller;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.carnaval.factory.EventFactory;
import com.carnaval.model.Event;
import com.carnaval.model.EventDTO;
import com.carnaval.repository.EventRepository;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private static final Logger logger = LoggerFactory.getLogger(EventController.class);

    @Autowired
    private EventRepository eventRepository;

    // Crear evento
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createEvent(@ModelAttribute EventDTO dto) {
        MultipartFile file = dto.getMedia();

        if (file == null || file.isEmpty()) {
            logger.error("Archivo no recibido o vacío");
            return ResponseEntity.badRequest().body("Archivo no recibido o vacío");
        }

        String uniqueFileName = generateUniqueFileName(file.getOriginalFilename());
        String uploadDir = System.getProperty("user.dir") + File.separator + "uploads";
        String bannerUrl = "/media/" + uniqueFileName;

        try {
            File uploadPath = new File(uploadDir);
            if (!uploadPath.exists()) {
                boolean created = uploadPath.mkdirs();
                logger.info("Directorio creado: " + created);
            }

            File destFile = new File(uploadPath, uniqueFileName);
            file.transferTo(destFile);
            logger.info("Archivo guardado correctamente en: " + destFile.getAbsolutePath());

            Event event = EventFactory.createEventFromDTO(dto, bannerUrl);
            Event savedEvent = eventRepository.save(event);

            EventDTO responseDto = new EventDTO(savedEvent);
            responseDto.setBannerUrl(bannerUrl);

            return ResponseEntity.ok(responseDto);

        } catch (IOException e) {
            logger.error("Error al guardar el archivo", e);
            return ResponseEntity.internalServerError().body("Error al guardar el archivo: " + e.getMessage());
        }
    }

    // Actualizar evento
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateEvent(@PathVariable Long id, @ModelAttribute EventDTO dto) {
        return eventRepository.findById(id).map(event -> {
            event.setTitle(dto.getTitle());
            event.setDescription(dto.getDescription());
            event.setLocation(dto.getLocation());
            event.setDate(java.time.LocalDate.parse(dto.getDate()));

            MultipartFile file = dto.getMedia();
            if (file != null && !file.isEmpty()) {
                String uniqueFileName = generateUniqueFileName(file.getOriginalFilename());
                String uploadDir = System.getProperty("user.dir") + File.separator + "uploads";
                String bannerUrl = "/media/" + uniqueFileName;

                try {
                    File uploadPath = new File(uploadDir);
                    if (!uploadPath.exists()) {
                        boolean created = uploadPath.mkdirs();
                        logger.info("Directorio creado: " + created);
                    }

                    File destFile = new File(uploadPath, uniqueFileName);
                    file.transferTo(destFile);
                    event.setBannerUrl(bannerUrl);
                } catch (IOException e) {
                    logger.error("Error al guardar archivo al actualizar", e);
                    return ResponseEntity.internalServerError().body("Error al guardar archivo: " + e.getMessage());
                }
            }

            Event updatedEvent = eventRepository.save(event);
            EventDTO responseDto = new EventDTO(updatedEvent);
            responseDto.setBannerUrl(event.getBannerUrl());

            return ResponseEntity.ok(responseDto);
        }).orElse(ResponseEntity.notFound().build());
    }

    // Obtener evento por id
    @GetMapping("/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable Long id) {
        return eventRepository.findById(id)
                .map(event -> ResponseEntity.ok().body(event))
                .orElse(ResponseEntity.notFound().build());
    }

    // Eliminar evento
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEvent(@PathVariable Long id) {
        if (!eventRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        eventRepository.deleteById(id);
        return ResponseEntity.ok("Evento eliminado con éxito");
    }

    // Listar todos los eventos
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Event>> getAllEvents() {
        List<Event> events = eventRepository.findAll();
        return ResponseEntity.ok(events);
    }

    // Generar nombre único para archivos
    private String generateUniqueFileName(String originalFileName) {
        String fileExtension = "";
        if (originalFileName != null && originalFileName.contains(".")) {
            fileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));
        }
        return UUID.randomUUID().toString() + fileExtension;
    }
}
