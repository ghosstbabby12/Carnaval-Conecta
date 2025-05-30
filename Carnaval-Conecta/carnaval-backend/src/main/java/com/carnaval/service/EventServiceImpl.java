package com.carnaval.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.carnaval.model.Event;
import com.carnaval.repository.EventRepository;

@Service // <---- IMPORTANTE
public class EventServiceImpl implements IEventService {

    private final EventRepository repository;

    public EventServiceImpl(EventRepository repository) {
        this.repository = repository;
    }

    @Override
    public Event create(Event event) {
        return repository.save(event);
    }

    @Override
    public List<Event> getAll() {
        return repository.findAll();
    }
}
