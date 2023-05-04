package com.example.springbootmaven.Services;

import com.example.springbootmaven.Repositories.UserLocksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserLocksService {

    @Autowired
    public UserLocksRepository userLocksRepository;

}
