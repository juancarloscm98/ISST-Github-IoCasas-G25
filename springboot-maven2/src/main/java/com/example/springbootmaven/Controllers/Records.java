package com.example.springbootmaven.Controllers;

import com.example.springbootmaven.Entities.Locks;
import com.example.springbootmaven.Entities.User;
import com.example.springbootmaven.Services.RecordService;
import com.example.springbootmaven.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/records")
public class Records {

    @Autowired
    public RecordService recordService;
    @Autowired
    public UserService userService;

    /**
     * Inserta el registrod dentro de la tabla
     * @param token
     * @param state
     * @param lock
     */
    @PutMapping("/record")
    public void record(@RequestParam("userToken")String token,@RequestParam("state") String state,@RequestBody Locks lock){
            User user=userService.findByToken(token);
            recordService.setRecord(lock,user,state);
    }


}
