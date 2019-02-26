package com.laborExchange.coremodule.user.dto;

import com.laborExchange.coremodule.user.entity.User;
import com.laborExchange.coremodule.user.entity.UserRole;
import lombok.Data;

@Data
public class UserDtoComment {
    private Long id;
    private String username;
    private String mail;
    private UserRole userRole;

    public UserDtoComment(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.mail = user.getMail();
        this.userRole = user.getUserRole();
    }
}
