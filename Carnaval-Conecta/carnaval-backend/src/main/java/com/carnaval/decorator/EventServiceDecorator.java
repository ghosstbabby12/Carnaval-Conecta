package com.carnaval.decorator;

import java.util.List;

import com.carnaval.model.Event;
import com.carnaval.service.IEventService;

public class EventServiceDecorator implements IEventService {

    protected IEventService decoratedService;

    public EventServiceDecorator(IEventService decoratedService) {
        this.decoratedService = decoratedService;
    }

    @Override
    public Event create(Event event) {
        return decoratedService.create(event);
    }

    @Override
    public List<Event> getAll() {
        return decoratedService.getAll();
    }
}
