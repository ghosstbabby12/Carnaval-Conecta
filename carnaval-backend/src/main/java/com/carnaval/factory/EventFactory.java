package com.carnaval.factory;

import java.time.LocalDate;

import com.carnaval.model.Event;
import com.carnaval.model.EventDTO;

public class EventFactory {
    public static Event createEventFromDTO(EventDTO dto, String bannerUrl) {
        Event event = new Event();
        event.setTitle(dto.getTitle());
        event.setDescription(dto.getDescription());
        event.setLocation(dto.getLocation());
        event.setDate(LocalDate.parse(dto.getDate()));
        event.setBannerUrl(bannerUrl);
        return event;
    }
}
