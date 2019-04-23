package com.laborExchange.webmodule.config.authDto;

import lombok.Data;

@Data
public class AuthenticatedUserResponseDto {

    private String token;
    private String userId;
    private String userName;
    private String userRole;

    public AuthenticatedUserResponseDto(String token, String userId, String userName, String userRole) {
        this.token = token;
        this.userId = userId;
        this.userName = userName;
        this.userRole = userRole;
    }

    public String toJsonView() {
        return "{" +
                "\"token\" :" + "\"" +token  +"\"" +
                ", \"userRole\":" + "\"" +userRole +"\"" +
                ", \"userId\":" +"\"" + userId +"\"" +
                ", \"userName\":" +"\"" + userName +"\"" +
                '}';
    }
}
