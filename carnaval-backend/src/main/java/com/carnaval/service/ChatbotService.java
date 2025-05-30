package com.carnaval.service;

import com.carnaval.dto.ChatRequest;
import com.carnaval.model.Message;
import com.carnaval.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ChatbotService {

    @Autowired
    private GeminiService geminiService;

    @Autowired
    private MessageRepository messageRepository;

    public Message createMessage(ChatRequest request) {
        String userMessage = request.getMessage();
        String username = request.getUsername();

        // Validación básica de entrada
        if (userMessage == null || userMessage.isBlank()) {
            throw new IllegalArgumentException("El mensaje del usuario no puede estar vacío.");
        }
        if (username == null || username.isBlank()) {
            username = "anon"; // Valor por defecto si no se especifica
        }

        // Contexto del Carnaval (solo si aplica)
        String contextoCarnaval = """
                Proporcióname información completa y detallada sobre el Carnaval de Negros y Blancos de Pasto, incluyendo:
                - Contexto histórico y cultural del carnaval
                - Origen del Carnaval de Negros y Blancos
                - Su importancia cultural y patrimonial
                - Cuándo se celebra (del 2 al 7 de enero)
                - Actividades que puede hacer un visitante
                - Fechas clave y eventos diarios (Día de los Inocentes, Desfile de Colonias, Carnavalito, Día de Negros, Día de Blancos)
                - Recomendaciones de lugares para visitar en Pasto durante el carnaval
                - Actividades interactivas como juegos con pintura y talco, música y danzas
                - Gastronomía típica que debe probar el visitante
                - Información sobre las carrozas, cómo se diseñan y qué representan (temas mitológicos, sociales y culturales), qué materiales se usan y cuánto tiempo toma construirlas, dónde se pueden ver (especialmente durante el Gran Desfile del 6 de enero)
                - Consejos útiles para los asistentes: qué ropa llevar, seguridad y comportamiento recomendado, dónde alojarse y cómo moverse en la ciudad durante los días del carnaval.
                """;

        String userMessageLower = userMessage.toLowerCase();
        String finalPrompt;

        if (userMessageLower.contains("carnaval") ||
                userMessageLower.contains("negros y blancos") ||
                userMessageLower.contains("pasto") ||
                userMessageLower.contains("carroza") ||
                userMessageLower.contains("desfile")) {

            finalPrompt = contextoCarnaval + "\n\nPregunta del usuario: " + userMessage;
        } else {
            finalPrompt = userMessage;
        }

        // Obtener respuesta del modelo Gemini
        String botResponse = geminiService.generateResponse(finalPrompt);

        // Construcción del objeto Message
        Message message = new Message();
        message.setUsername(username);
        message.setUserMessage(userMessage);
        message.setBotResponse(botResponse);
        message.setTimestamp(LocalDateTime.now());

        return message;
    }

    public Message saveMessage(Message message) {
        try {
            return messageRepository.save(message);
        } catch (Exception e) {
            System.err.println("❌ Error al guardar el mensaje en la base de datos: " + e.getMessage());
            throw new RuntimeException("No se pudo guardar el mensaje.");
        }
    }

    public List<Message> getAllMessages() {
        return messageRepository.findAll();
    }
}
