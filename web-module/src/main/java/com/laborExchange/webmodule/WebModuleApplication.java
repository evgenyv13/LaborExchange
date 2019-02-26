package com.laborExchange.webmodule;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan("com.laborExchange")
@EntityScan("com.laborExchange")
@EnableJpaRepositories("com.laborExchange")
public class WebModuleApplication {

	public static void main(String[] args) {
	    SpringApplication.run(WebModuleApplication.class, args);
	}
}
