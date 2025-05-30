package com.carnaval.facade;

import com.carnaval.decorator.TimestampDecorator;
import com.carnaval.dto.ChatRequest;
import com.carnaval.model.Message;
import com.carnaval.observer.MessageNotifier;
import com.carnaval.service.ChatbotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ChatbotFacade {
    @Autowired
    private ChatbotService chatbotService;

    @Autowired
    private MessageNotifier notifier;

    public Message handleUserMessage(ChatRequest request) {
        Message message = chatbotService.createMessage(request);
        Message decorated = TimestampDecorator.decorate(message);
        notifier.notifyObservers(decorated);
        return chatbotService.saveMessage(decorated);
    }

    public List<Message> getAllMessages() {
        return chatbotService.getAllMessages();
    }
}
