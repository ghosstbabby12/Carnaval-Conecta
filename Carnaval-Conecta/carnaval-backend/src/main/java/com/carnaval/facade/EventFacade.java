package com.carnaval.facade;

import java.util.List;

import org.springframework.stereotype.Component;

import com.carnaval.model.Event;
import com.carnaval.service.IEventService;

@Component
public class EventFacade {

    private final IEventService service;

    public EventFacade(IEventService service) {
        this.service = service;
    }

    public Event create(Event event) {
        return service.create(event);
    }

    public List<Event> getAll() {
        return service.getAll();
    }
}
