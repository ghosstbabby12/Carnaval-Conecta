package com.carnaval.pasto.service;

import org.springframework.stereotype.Service;
import com.carnaval.pasto.decorator.CarnavalPlace;
import com.carnaval.pasto.factory.CarnavalPlaceFactory;

@Service
public class PlaceService {
    private final CarnavalPlaceFactory factory = new CarnavalPlaceFactory();

    public String getPlaceDescription(String name) {
        CarnavalPlace place = factory.createPlace(name);
        return (place != null) ? place.getDescription() : "Lugar no reconocido";
    }
}
