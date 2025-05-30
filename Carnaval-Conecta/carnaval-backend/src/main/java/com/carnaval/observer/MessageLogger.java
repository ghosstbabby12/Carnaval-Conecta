package com.carnaval.observer;

import com.carnaval.model.Message;

public class MessageLogger implements MessageObserver {
    @Override
    public void onNewMessage(Message message) {
        System.out.println("📨 New message logged: " + message.getUserMessage());
    }
}
