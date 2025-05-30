package com.carnaval.model;

import java.time.format.DateTimeFormatter;
import org.springframework.web.multipart.MultipartFile;

public class EventDTO {

    private String title;
    private String location;
    private String description;
    private String date;
    private MultipartFile media;

    private String bannerUrl; // <- Agrega esto

    public EventDTO() {
    }

    public EventDTO(Event event) {
        this.title = event.getTitle();
        this.location = event.getLocation();
        this.description = event.getDescription();
        this.date = event.getDate().format(DateTimeFormatter.ISO_DATE);
        this.bannerUrl = event.getBannerUrl(); // <- Agrega esto para que se inicialice en constructor
    }

    // Getters y Setters para todos los campos
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public MultipartFile getMedia() {
        return media;
    }

    public void setMedia(MultipartFile media) {
        this.media = media;
    }

    // Getter y Setter para bannerUrl
    public String getBannerUrl() {
        return bannerUrl;
    }

    public void setBannerUrl(String bannerUrl) {
        this.bannerUrl = bannerUrl;
    }
}
