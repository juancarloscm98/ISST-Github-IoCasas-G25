package com.example.springbootmaven.Services;

import com.example.springbootmaven.Entities.Locks;
import com.example.springbootmaven.Entities.User;
import com.example.springbootmaven.Repositories.LockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LockService {

    @Autowired
    public LockRepository lockRepository;

    //Devuelve los registros de todos los locks
    public List<Locks> getAllLocks() {
        return lockRepository.findAll();
    }

    public List<Locks> getLocksByAdminToken(String token){
        return lockRepository.findByTokenUser(token);
    }
}
