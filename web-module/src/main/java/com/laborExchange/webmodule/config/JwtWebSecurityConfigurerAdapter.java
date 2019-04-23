package com.laborExchange.webmodule.config;

import com.laborExchange.coremodule.user.service.UserService;
import com.laborExchange.webmodule.config.authDto.AuthenticatedUserResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@EnableGlobalMethodSecurity(prePostEnabled = true)
@EnableWebSecurity
@Configuration
public class JwtWebSecurityConfigurerAdapter extends WebSecurityConfigurerAdapter {

    @Autowired
    private JwtAuthenticationProviderImpl authenticationProvider;
    @Autowired
    private UserService userService;
    @Autowired
    private JwtTokenGenerator jwtTokenGenerator;


    @Autowired
    private AuthenticationEntryPointImpl entryPoint;

    public JwtAuthAuthenticationProcessingFilterImpl authTokenFilter() throws Exception {

        JwtAuthAuthenticationProcessingFilterImpl filter = new JwtAuthAuthenticationProcessingFilterImpl();
        filter.setAuthenticationManager(authenticationManager());
        filter.setAuthenticationSuccessHandler(new JwtAuthenticationSuccessHandlerImpl());
        return filter;

    }

    public UserDetailsService userDetailsServiceIml() {
        return new UserDetailServiceImpl(userService);
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//        super.configure(auth);
        auth.authenticationProvider(authenticationProvider)
                .userDetailsService(userDetailsServiceIml())
        .passwordEncoder(passwordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        final CorsConfiguration config = new CorsConfiguration();

        config.addAllowedOrigin("*");
        config.addAllowedHeader("*");
        config.addAllowedMethod("GET");
        config.addAllowedMethod("PUT");
        config.addAllowedMethod("POST");
        config.addAllowedMethod("DELETE");
        config.setAllowCredentials(true);
        source.registerCorsConfiguration("/**", config);
        http.csrf().disable()
                .authorizeRequests().antMatchers("**/**").authenticated()
                .and().cors().configurationSource(source).and()
                .exceptionHandling().authenticationEntryPoint(entryPoint)
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http.addFilterBefore(authTokenFilter(), UsernamePasswordAuthenticationFilter.class);
        http.headers().cacheControl();
        http.formLogin()
                .loginProcessingUrl("/auth") //the URL on which the clients should post the login information
                .usernameParameter("username") //the username parameter in the queryString, default is 'username'
                .passwordParameter("password") //the password parameter in the queryString, default is 'password'
                .successHandler(this::loginSuccessHandler).failureHandler(this::loginFailureHandler);
        http.cors();
    }

    private void loginSuccessHandler(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication) throws IOException {

        UsernamePasswordAuthenticationToken upToken = (UsernamePasswordAuthenticationToken) authentication;
        UserDetail userDetail = (UserDetail) upToken.getPrincipal();
        String generate = jwtTokenGenerator.generate(userDetail);

        AuthenticatedUserResponseDto authenticatedUserResponseDto = new AuthenticatedUserResponseDto(generate,userDetail.getId().toString(), userDetail.getUsername(),userDetail.getUserRole().name() );

        response.getWriter().write(authenticatedUserResponseDto.toJsonView());
    }

    private void loginFailureHandler(
            HttpServletRequest request,
            HttpServletResponse response,
            AuthenticationException e) throws IOException {

        String errStatusInJsonFormat = "{ \"status\" :\"failed\" }";
        response.getWriter().write( errStatusInJsonFormat);

        response.setStatus(HttpStatus.UNAUTHORIZED.value());
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


}