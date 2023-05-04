package com.example.springbootmaven.Controllers.Locks;


import com.example.springbootmaven.Entities.Locks;
import com.example.springbootmaven.Entities.Records;
import com.example.springbootmaven.Services.LockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/locks/user")
public class LockUser {

    @Autowired
    public LockService lockService;

    /**
     * Busqueda de las cerraduras que le pertenecen a un usuario
     * @param token
     * @return
     */
    @GetMapping("/locksUser")
    public List<Locks> getLocksUser(@RequestParam("token") String token){
        System.out.println(token);
        return lockService.getLocksByUserToken(token);
    }


}
