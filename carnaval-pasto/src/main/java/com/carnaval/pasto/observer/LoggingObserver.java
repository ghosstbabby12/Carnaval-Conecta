package com.carnaval.pasto.observer;

public class LoggingObserver implements PlaceObserver {

    @Override
    public void onPlaceAdded(String placeDescription) {
        System.out.println("New place added: " + placeDescription);
    }
}
