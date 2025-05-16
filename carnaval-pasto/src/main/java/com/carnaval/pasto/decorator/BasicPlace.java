// src/main/java/com/carnaval/pasto/decorator/BasicPlace.java
package com.carnaval.pasto.decorator;



public abstract class BasicPlace implements CarnavalPlace {
    protected final CarnavalPlace place;

    public BasicPlace(CarnavalPlace place) {
        this.place = place;
    }

    @Override
    public String getDescription() {
        return place.getDescription();
    }
}
