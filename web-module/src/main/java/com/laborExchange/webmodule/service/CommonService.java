package com.laborExchange.webmodule.service;

import com.laborExchange.coremodule.common.exception.EntityNotFoundCustomException;
import com.laborExchange.coremodule.user.entity.User;
import com.laborExchange.coremodule.user.repository.UserRepository;
import com.laborExchange.webmodule.config.JwtAuthenticationImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class CommonService {
    private final UserRepository userRepository;

    @Autowired
    public CommonService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getCurrentUser(){
        JwtAuthenticationImpl jwtAuthentication = (JwtAuthenticationImpl)SecurityContextHolder.getContext().getAuthentication();
        User userById = userRepository.findById(jwtAuthentication.getUserId()).orElseThrow(()->new EntityNotFoundCustomException("User Token contains invalid user id"));
        return userById;
    }

    public User getCurrentUserRef(){
        JwtAuthenticationImpl jwtAuthentication = (JwtAuthenticationImpl)SecurityContextHolder.getContext().getAuthentication();
        Long userId = jwtAuthentication.getUserId();
        User userById = userRepository.getOne(userId);
        return userById;
    }
    public Long getCurrentUserId(){
        JwtAuthenticationImpl jwtAuthentication = (JwtAuthenticationImpl)SecurityContextHolder.getContext().getAuthentication();
        Long userId = jwtAuthentication.getUserId();
        return userId;
    }
}
