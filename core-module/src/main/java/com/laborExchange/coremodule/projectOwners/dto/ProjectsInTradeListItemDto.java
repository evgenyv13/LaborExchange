package com.laborExchange.coremodule.projectOwners.dto;

import com.laborExchange.coremodule.project.dto.ProjectDto;
import com.laborExchange.coremodule.project.entity.Project;
import lombok.Data;

@Data
public class ProjectsInTradeListItemDto {
    ProjectDto project;
    Long countOfTraders;

    public ProjectsInTradeListItemDto(Project project, Long count) {
        this.project = new ProjectDto(project);
        this.countOfTraders = count;
    }
}
