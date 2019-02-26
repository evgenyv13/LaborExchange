package com.laborExchange.coremodule.projectOwners;

import com.laborExchange.coremodule.project.dto.ProjectDto;
import com.laborExchange.coremodule.user.dto.UserDto;
import lombok.Data;

@Data
public class ProjectOwnersDto {
    private Long id;

    private UserDto user;

    private float percent;

    private ProjectDto project;

    public ProjectOwnersDto(ProjectOwners projectOwners){
        this.id = projectOwners.getId();
        this.percent = projectOwners.getPercent();
        this.user = new UserDto(projectOwners.getUser());
        this.project = new ProjectDto(projectOwners.getProject());
    }
}
