package com.carnaval.observer;

import com.carnaval.model.Message;

public interface MessageObserver {
    void onNewMessage(Message message);
}
