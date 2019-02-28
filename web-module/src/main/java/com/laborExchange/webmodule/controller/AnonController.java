package com.laborExchange.webmodule.controller;

import com.laborExchange.coremodule.user.entity.User;
import com.laborExchange.coremodule.user.entity.UserRole;
import com.laborExchange.coremodule.user.repository.UserRepository;
import com.laborExchange.webmodule.config.JwtGen;
import com.laborExchange.webmodule.config.JwtVal;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
public class AnonController {
    @Autowired
    private JwtGen jwtGen;

    @Autowired
    private JwtVal jwtVal;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @PostMapping(value = "/auth")
    @ResponseBody
    public String getToken(@ModelAttribute final User user) throws JSONException {
        JSONObject json = new JSONObject();
        String generate = jwtGen.generate(user);
        User validate = jwtVal.validate(generate);
        if (generate == null) {
            json.put("error", "Invalid data");
        } else {
            json.put("status", 200);
            json.put("token", generate);
            json.put("role", validate.getUserRole().name());
        }
        return json.toString();

    }


    @PostMapping(value = "/registration")
    @ResponseBody
    public String processAdminRegistration(User user, BindingResult bindingResult) throws JSONException {
        JSONObject jsonObject = new JSONObject();
        user.setUserRole(UserRole.ROLE_USER);
        if (userRepository.findUserByUsername(user.getUsername()) == null) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userRepository.save(user);
            jsonObject.put("status", "success");
            return jsonObject.toString();
        }
        jsonObject.put("error", "user exists");
        return jsonObject.toString();
    }
}
