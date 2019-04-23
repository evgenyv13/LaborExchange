package com.laborExchange.coremodule.projectOwners.dto;

import com.laborExchange.coremodule.project.dto.ProjectMinimalDto;
import com.laborExchange.coremodule.project.entity.Project;
import lombok.Data;

@Data
public class ProjectOwnedByUserDto {
    private Long id;
    private float freeToSellToken;
    private float freeToSellPerTokenPrice;
    private float percent;
    private ProjectMinimalDto project;

    public ProjectOwnedByUserDto(Long id, float freeToSellToken, float freeToSellPerTokenPrice, float percent, Project project) {
        this.id = id;
        this.freeToSellToken = freeToSellToken;
        this.freeToSellPerTokenPrice = freeToSellPerTokenPrice;
        this.percent = percent;
        this.project = new ProjectMinimalDto(project);
    }
}
