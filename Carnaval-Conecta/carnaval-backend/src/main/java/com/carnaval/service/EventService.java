package com.carnaval.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.carnaval.model.Event;
import com.carnaval.repository.EventRepository;

@Service
public class EventService {
    private final EventRepository repository;

    public EventService(EventRepository repository) {
        this.repository = repository;
    }

    public Event create(Event event) {
        return repository.save(event);
    }
    public Event save(Event event) {
        return repository.save(event);
    }

    public List<Event> getAll() {
        return repository.findAll();
    }


}
