package com.carnaval.controller;

import com.carnaval.dto.ChatRequest;
import com.carnaval.model.Message;
import com.carnaval.facade.ChatbotFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    @Autowired
    private ChatbotFacade chatbotFacade;

    @PostMapping
    public Message handleChat(@RequestBody ChatRequest request) {
        return chatbotFacade.handleUserMessage(request);
    }

    @GetMapping("/messages")
    public List<Message> getAllMessages() {
        return chatbotFacade.getAllMessages();
    }
}
