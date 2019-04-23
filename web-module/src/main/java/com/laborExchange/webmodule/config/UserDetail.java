package com.laborExchange.webmodule.config;

import com.laborExchange.coremodule.user.entity.UserRole;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

public class UserDetail implements UserDetails {
    private Long id;
    private String username;
    private String password;
    private UserRole userRole;

    private Collection<? extends GrantedAuthority> authorities;

    public UserDetail(Long id, String username, String password, UserRole userRole, Collection<? extends GrantedAuthority> authorities) {
        this.username = username;
        this.id = id;
        this.authorities = authorities;
        this.password = password;
        this.userRole = userRole;
    }

    public UserRole getUserRole() {
        return userRole;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public Long getId() {
        return id;
    }
}
