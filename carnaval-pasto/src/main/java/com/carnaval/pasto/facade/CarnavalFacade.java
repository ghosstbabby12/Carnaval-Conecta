package com.carnaval.pasto.facade;

import com.carnaval.pasto.factory.CarnavalPlaceFactory;
import com.carnaval.pasto.decorator.CarnavalPlace;
import com.carnaval.pasto.observer.PlaceObserver;

import java.util.ArrayList;
import java.util.List;

public class CarnavalFacade {

    private final CarnavalPlaceFactory placeFactory;
    private final List<CarnavalPlace> places;
    private final List<PlaceObserver> observers;

    public CarnavalFacade() {
        this.placeFactory = new CarnavalPlaceFactory();
        this.places = new ArrayList<>();
        this.observers = new ArrayList<>();
    }

    public void addPlace(String name) {
        CarnavalPlace place = placeFactory.createPlace(name);
        if (place != null) {
            places.add(place);
            notifyObservers(place.getDescription());
        }
    }

    public List<String> getAllPlaceDescriptions() {
        List<String> descriptions = new ArrayList<>();
        for (CarnavalPlace place : places) {
            descriptions.add(place.getDescription());
        }
        return descriptions;
    }

    public void addObserver(PlaceObserver observer) {
        observers.add(observer);
    }

    public void removeObserver(PlaceObserver observer) {
        observers.remove(observer);
    }

    private void notifyObservers(String placeDescription) {
        for (PlaceObserver observer : observers) {
            observer.onPlaceAdded(placeDescription);
        }
    }
}
