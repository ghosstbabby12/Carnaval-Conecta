package com.carnaval.pasto.decorator;

public abstract class PlaceDecorator implements CarnavalPlace {
    protected CarnavalPlace decoratedPlace;

    public PlaceDecorator(CarnavalPlace decoratedPlace) {
        this.decoratedPlace = decoratedPlace;
    }

    @Override
    public String getDescription() {
        return decoratedPlace.getDescription();
    }
}
