package com.example.springbootmaven.Controllers.Locks;


import com.example.springbootmaven.Entities.Locks;
import com.example.springbootmaven.Entities.Records;
import com.example.springbootmaven.Entities.UserLocks;
import com.example.springbootmaven.Services.LockService;
import com.example.springbootmaven.Services.UserLocksService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/locks/user")
public class LockUser {


    @Autowired
    public LockService lockService;
    @Autowired
    public UserLocksService userLocksService;

    /**
     * GET /api/locks/user/locksUser
     * Busqueda de las cerraduras a las que está asignado un usuario
     * @param token
     * @return
     */
    @GetMapping("/locksUser")
    public List<UserLocks> getLocksUser(@RequestParam("token") String token){
        System.out.println(token);
        return userLocksService.getUserLocksByToken(token);
    }

    /**
     * PUT /api/locks/user/changeState
     * @param lockId
     * @param state
     */
    @PutMapping("/changeState")
    public void setLockState(@RequestParam("lockId") String lockId,@RequestParam("state")String state){
        userLocksService.setLockState(lockId,state);
    }

    /**
     * GET /api/locks/user/locksAdmin
     * Busqueda de las cerraduras de los admin
     * @param token
     * @return
     */
    @GetMapping("/locksAdmin")
    public List<Locks>getLocksAdmin(@RequestParam("token") String token){
        return lockService.getLocksByAdminToken(token);
    }


}
