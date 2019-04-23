package com.laborExchange.webmodule.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import java.util.List;

@Configuration
public class PageableConfiguration extends WebMvcConfigurerAdapter {

    static final Pageable DEFAULT_PAGE_REQUEST = new PageRequest(0, 8);
    static final int MAX_PAGE_SIZE = 40;

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> argumentResolvers) {
        PageableHandlerMethodArgumentResolver resolver = new PageableHandlerMethodArgumentResolver();
        resolver.setFallbackPageable(DEFAULT_PAGE_REQUEST);
        resolver.setMaxPageSize(MAX_PAGE_SIZE);
        argumentResolvers.add(resolver);
        super.addArgumentResolvers(argumentResolvers);
    }
}