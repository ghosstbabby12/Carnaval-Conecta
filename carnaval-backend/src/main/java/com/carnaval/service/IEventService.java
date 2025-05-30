package com.carnaval.service;

import java.util.List;

import com.carnaval.model.Event;

public interface IEventService {
    Event create(Event event);
    List<Event> getAll();
}
