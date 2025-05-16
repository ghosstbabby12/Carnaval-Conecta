package com.carnaval.pasto.factory;

import com.carnaval.pasto.decorator.CarnavalPlace;
import com.carnaval.pasto.decorator.Parade;
import com.carnaval.pasto.decorator.MainSquare;

public class CarnavalPlaceFactory {

    public CarnavalPlace createPlace(String name) {
        if (name == null) return null;

        return switch (name.toLowerCase()) {
            case "parade" -> new Parade();
            case "square" -> new MainSquare();
            default -> null;
        };
    }
}
