package com.laborExchange.webmodule.config;

import com.laborExchange.webmodule.config.authDto.UserJwtParseDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class JwtAuthenticationProviderImpl implements AuthenticationProvider {

    private static final Logger LOGGER = LoggerFactory.getLogger(JwtAuthenticationProviderImpl.class);

    @Autowired
    private JwtTokenValidator validator;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {

        JwtAuthenticationImpl jwtAuthenticationToken = (JwtAuthenticationImpl) authentication;
        String token = jwtAuthenticationToken.getToken();

        // create EntityObject
        UserJwtParseDto userJwtParseDto = validator.validate(token);

        if (userJwtParseDto == null) {
            LOGGER.warn("JWT Token is incorrect");
            throw new RuntimeException("JWT Token is incorrect");
        }

        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(userJwtParseDto.getUserRole().name()));

        jwtAuthenticationToken.setUserId(userJwtParseDto.getUserId());
        jwtAuthenticationToken.setUsername(userJwtParseDto.getUserName());
        jwtAuthenticationToken.setAuthorities(authorities);

        jwtAuthenticationToken.setAuthenticated(true);

        return jwtAuthenticationToken;
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(JwtAuthenticationImpl.class);
    }
}
