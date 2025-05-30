// observer/EmailNotifier.java
package com.carnaval.observer;

import com.carnaval.model.Event;

public class EmailNotifier implements EventObserver {
    @Override
    public void onEventCreated(Event event) {
        System.out.println("📧 Email enviado por evento: " + event.getTitle());
    }
}
