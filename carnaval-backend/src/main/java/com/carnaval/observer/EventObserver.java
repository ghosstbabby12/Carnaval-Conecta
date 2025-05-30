// observer/EventObserver.java
package com.carnaval.observer;

import com.carnaval.model.Event;

public interface EventObserver {
    void onEventCreated(Event event);
}
