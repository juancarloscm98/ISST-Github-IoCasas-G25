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
     * HAY QUE AÑADIRLE UN IDENTIFICADOR ÚNICO A CADA CERRADURA EN EL CAMPO lockIdentifier
     * POST /api/locks/lockRegister
     * Registro de una cerradura
     * @param tokenUser
     * @param lock
     * @return - ResponseEntity
     */
    @PostMapping("/lockRegister")
    public ResponseEntity<String> createLock(@RequestParam("tokenUser") String tokenUser,@RequestBody Locks lock){
        //Guardo el registro en la tabla Locks
        Date today=new Date();
        lock.setDateOfRegister(today);
        lock.setLockIndentifier(userService.random());
        lock.setState("Closed");
        lockRepository.save(lock);
        System.out.println(tokenUser);
        //Obtengo el user con ese token
        User userDoor=userRepository.findByToken(tokenUser);
        System.out.println(userDoor);
        Date hoy = new Date();
        //Creo el registro
        Records newRecord=new Records(userDoor,lock,hoy);
        recordRepository.save(newRecord);
        return new ResponseEntity<>("Nuevo usuario creado", HttpStatus.CREATED);

    }

    /**
     *GET /api/locks/allLocks
     * @return - Lista de cerraduras
     */
    @GetMapping("/allLocks")
    public List<Locks> getLocks(){
        return lockService.getAllLocks();
    }


    /**
     * Actualiza el estado de la puerta
     * @param lockIdentifier
     * @param state
     */
    @PostMapping("/updateState")
    public void updateState(@RequestParam("lockIdentifier") String lockIdentifier,@RequestParam("state") String state){
        System.out.println(lockIdentifier);
        System.out.println(state);
        lockRepository.updateState(lockIdentifier,state);
    }
}
