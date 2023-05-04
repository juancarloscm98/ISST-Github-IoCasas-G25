package com.example.springbootmaven.Controllers;

import com.example.springbootmaven.Entities.Locks;
import com.example.springbootmaven.Entities.Records;
import com.example.springbootmaven.Entities.User;
import com.example.springbootmaven.Repositories.LockRepository;
import com.example.springbootmaven.Repositories.RecordRepository;
import com.example.springbootmaven.Repositories.UserRepository;
import com.example.springbootmaven.Services.LockService;
import com.example.springbootmaven.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/locks")
public class LockController {
    @Autowired
    private RecordRepository recordRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private LockService lockService;
    @Autowired
    private LockRepository lockRepository;



    /**
     * GET /api/locks/allLocks
     *
     * @return - Lista de cerraduras
     */
    @GetMapping("/allLocks")
    public List<Locks> getLocks() {
        return lockService.getAllLocks();
    }


    /**
     * Actualiza el estado de la puerta
     *
     * @param lockIdentifier
     * @param state
     */
    @PostMapping("/updateState")
    public void updateState(@RequestParam("lockIdentifier") String lockIdentifier, @RequestParam("state") String state) {
        Locks recordLock = lockRepository.findByLockIndetifier(lockIdentifier);
        lockRepository.updateState(lockIdentifier, state);
    }
}
