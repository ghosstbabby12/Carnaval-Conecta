package com.carnaval.pasto.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class RutaCarnaval {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private String ubication;
    private String imagenUrl;
}
