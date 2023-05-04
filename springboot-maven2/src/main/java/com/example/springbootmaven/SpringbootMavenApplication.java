package com.example.springbootmaven;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class })
public class SpringbootMavenApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringbootMavenApplication.class, args);
	}

}
