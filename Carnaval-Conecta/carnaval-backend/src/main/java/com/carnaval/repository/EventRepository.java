// repository/EventRepository.java
package com.carnaval.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.carnaval.model.Event;

public interface EventRepository extends JpaRepository<Event, Long> {}
