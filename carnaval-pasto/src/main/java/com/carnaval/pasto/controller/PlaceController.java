package com.carnaval.pasto.controller;

import com.carnaval.pasto.facade.CarnavalFacade;
import com.carnaval.pasto.observer.LoggingObserver;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/places")
public class PlaceController {

    private final CarnavalFacade facade = new CarnavalFacade();

    public PlaceController() {
        // Agregar un observer para recibir notificaciones
        facade.addObserver(new LoggingObserver());
    }

    @GetMapping
    public List<String> getPlaces() {
        return facade.getAllPlaceDescriptions();
    }

    @PostMapping("/{name}")
    public String addPlace(@PathVariable String name) {
        facade.addPlace(name);
        return "Place added: " + name;
    }
}
