package com.example.springbootmaven.Services;

import com.example.springbootmaven.Entities.Locks;
import com.example.springbootmaven.Entities.Records;
import com.example.springbootmaven.Repositories.RecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecordService {
    @Autowired
    public RecordRepository recordRepository;

    //Obtengo todos los records
    public List<Records> getAllRecords(){
        return recordRepository.findAll();
    }

    //Locks de un cierto usuario
    public List<Records> getLocksUSer(String token){

        return recordRepository.findByUserIdToken(token);
    }
}
