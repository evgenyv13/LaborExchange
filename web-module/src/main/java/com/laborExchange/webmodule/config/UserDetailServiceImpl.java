package com.laborExchange.webmodule.config;

import com.laborExchange.coremodule.user.entity.User;
import com.laborExchange.coremodule.user.service.UserService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.ArrayList;


public class UserDetailServiceImpl implements UserDetailsService {

    private UserService userService;

    public UserDetailServiceImpl(UserService userService) {
        this.userService = userService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userService.findUserByUsername(username);
        UserDetail userDetail = new UserDetail(user.getId(),user.getUsername(),user.getPassword(),user.getUserRole(),new ArrayList<>());

        return userDetail;
    }
}