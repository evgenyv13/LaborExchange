package com.laborExchange.coremodule.project.dto;

import com.laborExchange.coremodule.odt.Odt;
import com.laborExchange.coremodule.project.entity.Project;
import com.laborExchange.coremodule.project.projectFields.ProjectSubCategoryDto;
import com.laborExchange.coremodule.tasks.dto.TasksDto;
import com.laborExchange.coremodule.user.dto.UserDto;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class ProjectDto {

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
    private UserDto projectOwner = null;
    //private CategoryDto projectCategory = null;
    private List<UserDto> percentedOwnersProject = null;
    private List<TasksDto> projectTasks = null;
    private List<ProjectSubCategoryDto> projectSubCategorys = null;

    public ProjectDto(Project project) {
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
        this.projectSubCategorys = Odt.convertLists(project.getProjectSubCategories(), item ->new ProjectSubCategoryDto(item));
    }
}
