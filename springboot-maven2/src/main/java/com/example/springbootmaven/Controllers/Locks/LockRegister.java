package com.example.springbootmaven.Controllers.Locks;

import com.example.springbootmaven.Entities.Locks;
import com.example.springbootmaven.Entities.Records;
import com.example.springbootmaven.Entities.User;
import com.example.springbootmaven.Repositories.LockRepository;
import com.example.springbootmaven.Repositories.RecordRepository;
import com.example.springbootmaven.Repositories.UserRepository;
import com.example.springbootmaven.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.convert.PeriodUnit;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@CrossOrigin
@RestController
@RequestMapping("/api/locks")
public class LockRegister {
    @Autowired
    private LockRepository lockRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RecordRepository recordRepository;
    @Autowired
    private UserService userService;

    /**
     * Registro de la cerradura
     * @param tokenUser
     * @param lock
     * @return
     */
    @PostMapping("/register")
    public ResponseEntity<String> createLock(@RequestParam("tokenUser") String tokenUser, @RequestBody Locks lock) {

        lock.setUserId(userRepository.findByToken(tokenUser));
        lock.setLockIndentifier(userService.random());
        lock.setDateOfRegister(new Date());
        lockRepository.save(lock);

        return new ResponseEntity<>("Nueva cerradura creada", HttpStatus.CREATED);

    }


    /**
     * Eliminación de cerradura
     * @param lock
     * @return
     */
    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteLock(@RequestBody Locks lock){
        System.out.println(lock);
        lockRepository.delete(lock);
        return new ResponseEntity<>("Cerradura eliminada",HttpStatus.CREATED);

    }
}
