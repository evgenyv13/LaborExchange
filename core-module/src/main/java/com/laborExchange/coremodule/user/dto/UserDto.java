package com.laborExchange.coremodule.user.dto;

import com.laborExchange.coremodule.project.dto.ProjectDto;
import com.laborExchange.coremodule.tasks.dto.TasksDto;
import com.laborExchange.coremodule.tasksReply.dto.TaskReplyDto;
import com.laborExchange.coremodule.user.entity.User;
import com.laborExchange.coremodule.user.entity.UserRole;
import lombok.Data;

import java.util.List;

@Data
public class UserDto {
    private Long id;
    private String username;
    private String mail;
    private String website;
    private UserRole userRole;
    private String skills;

    private String linkedin;
    private String gmail;
    private String twitter;
    private String github;
    private String youtube;

    private List<ProjectDto> ownedMainProject;
    private List<TasksDto> myTasks;
    private List<ProjectDto> percentedOwnedProjects;
    private List<TaskReplyDto> myReplyingTasks;

    public UserDto(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.mail = user.getMail();
        this.website = user.getWebsite();
        this.userRole = user.getUserRole();
        this.skills = user.getSkills();

        this.linkedin = user.getLinkedin();
        this.gmail = user.getGmail();
        this.twitter = user.getTwitter();
        this.github = user.getGithub();
        this.youtube = user.getYoutube();
    }
}
