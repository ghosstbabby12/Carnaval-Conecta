package com.carnaval.observer;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class MessageNotifier {
    private List<MessageObserver> observers = new ArrayList<>();

    public void addObserver(MessageObserver observer) {
        observers.add(observer);
    }

    public void notifyObservers(Object message) {
        for (MessageObserver observer : observers) {
            observer.onNewMessage((com.carnaval.model.Message) message);
        }
    }
}
