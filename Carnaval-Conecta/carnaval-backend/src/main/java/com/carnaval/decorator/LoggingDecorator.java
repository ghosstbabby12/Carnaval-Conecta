package com.carnaval.decorator;

import java.util.List;

import com.carnaval.model.Event;
import com.carnaval.service.IEventService;

public class LoggingDecorator extends EventServiceDecorator {

    public LoggingDecorator(IEventService decoratedService) {
        super(decoratedService);
    }

    @Override
    public Event create(Event event) {
        System.out.println("Creando evento: " + event.getTitle());
        return super.create(event);
    }

    @Override
    public List<Event> getAll() {
        System.out.println("Obteniendo todos los eventos...");
        return super.getAll();
    }
}
