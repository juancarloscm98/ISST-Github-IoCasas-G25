package com.example.springbootmaven.Services;

import com.example.springbootmaven.Entities.UserLocks;
import com.example.springbootmaven.Repositories.UserLocksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserLocksService {

    @Autowired
    public UserLocksRepository userLocksRepository;


    public List<UserLocks> getUserLocksByToken(String token){
        return userLocksRepository.getUserLocksByToken(token);
    };

    public void setLockState(String lockId,String state){
         userLocksRepository.setLockState(lockId,state);
    }

}
