package com.laborExchange.webmodule.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtTokenGenerator {

    @Value("${APP-SECRET-KEY}")
    private String SECRET_KEY;

    public String generate(UserDetail user) {

        Claims claims = Jwts.claims().setSubject(user.getId().toString());

        claims.put("userId", user.getId());
        claims.put("userName", user.getUsername());
        claims.put("userRole", user.getUserRole());

        return Jwts.builder()
                .setClaims(claims)
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                .compact();
    }

}

