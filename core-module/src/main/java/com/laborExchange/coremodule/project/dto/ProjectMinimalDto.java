package com.laborExchange.coremodule.project.dto;

import com.laborExchange.coremodule.project.entity.Project;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ProjectMinimalDto {
    private Long id;
    private String name;
    private String description;
    private String contacts;
    private LocalDateTime creatingDate = null;

    private String linkedin;
    private String gmail;
    private String twitter;
    private String github;
    private String youtube;


    public ProjectMinimalDto(Project project) {
        this.id = project.getId();
        this.name = project.getName();
        this.description = project.getDescription();
        this.contacts = project.getContacts();
        this.linkedin = project.getLinkedin();
        this.gmail = project.getGmail();
        this.twitter = project.getTwitter();
        this.github = project.getGithub();
        this.youtube = project.getYoutube();
        if (project.getCreatingDate() != null) this.creatingDate = project.getCreatingDate().toLocalDateTime();
    }
}
