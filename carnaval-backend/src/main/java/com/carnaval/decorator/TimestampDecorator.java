package com.carnaval.decorator;

import com.carnaval.model.Message;

import java.time.LocalDateTime;

public class TimestampDecorator {
    public static Message decorate(Message message) {
        message.setTimestamp(LocalDateTime.now());
        return message;
    }
}