package com.laborExchange.coremodule.projectOwners.dto;

import com.laborExchange.coremodule.projectOwners.ProjectOwners;
import com.laborExchange.coremodule.user.dto.UserDto;
import com.laborExchange.coremodule.user.entity.User;
import lombok.Data;

@Data
public class ProjectOwnersMinimalDto {
    private Long id;
    private UserDto user;
    private float freeToSellToken;
    private float freeToSellPerTokenPrice;


    public ProjectOwnersMinimalDto(Long id, User user, float freeToSellToken, float freeToSellPerTokenPrice) {
        this.id = id;
        this.user = new UserDto(user);
        this.freeToSellToken = freeToSellToken;
        this.freeToSellPerTokenPrice = freeToSellPerTokenPrice;
    }

    public ProjectOwnersMinimalDto(ProjectOwners projectOwners) {
        this.id = projectOwners.getId();
        this.user = new UserDto(projectOwners.getUser());
        this.freeToSellToken = projectOwners.getFreeToSellToken();
        this.freeToSellPerTokenPrice = projectOwners.getFreeToSellPerTokenPrice();
    }
}
