package com.laborExchange.webmodule.config.authDto;

import com.laborExchange.coremodule.user.entity.UserRole;
import lombok.Data;

@Data
public class UserJwtParseDto {
    private String token;
    private Long userId;
    private String userName;
    private UserRole userRole;

    public UserJwtParseDto(String token, Long userId, String userName, UserRole userRole) {
        this.token = token;
        this.userId = userId;
        this.userName = userName;
        this.userRole = userRole;
    }
}
