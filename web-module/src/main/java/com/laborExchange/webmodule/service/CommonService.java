package com.laborExchange.webmodule.service;

import com.laborExchange.coremodule.user.entity.User;
import com.laborExchange.coremodule.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class CommonService {
    @Autowired
    private UserRepository userRepository;

    public User getCurrentUser(){
        String name = SecurityContextHolder.getContext().getAuthentication().getName();
        User userByName = userRepository.findUserByUsername(name);
        return userByName;
    }

    public static Object getSingleObjectFromList(List list){
        Object object;
        try{
            object = list.get(0);
        }catch (ArrayIndexOutOfBoundsException e){
            object = null;
        }
        return object;
    }


}
