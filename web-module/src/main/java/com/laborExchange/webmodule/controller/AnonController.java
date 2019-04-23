package com.laborExchange.webmodule.controller;

import com.laborExchange.coremodule.user.entity.User;
import com.laborExchange.coremodule.user.entity.UserRole;
import com.laborExchange.coremodule.user.repository.UserRepository;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.validation.Valid;

@Controller
public class AnonController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping(value = "/registration")
    @ResponseBody
    public Object processRegistration(@Valid User user, BindingResult bindingResult) throws JSONException {
        JSONObject jsonObject = new JSONObject();
        user.setUserRole(UserRole.ROLE_USER);

        if (!bindingResult.hasErrors() && userRepository.findUserByUsername(user.getUsername()) == null && userRepository.findUserByMail(user.getMail()) == null) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            @Valid User save = userRepository.save(user);
            if (save != null) {
                jsonObject.put("status", "success");
                return jsonObject;
            }
        }
        jsonObject.put("error", "Invalid data!");
        return jsonObject.toString();
    }
}
