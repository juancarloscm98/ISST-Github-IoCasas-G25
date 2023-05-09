package com.example.springbootmaven.Controllers.Locks;


import com.example.springbootmaven.Entities.Locks;
import com.example.springbootmaven.Entities.Records;
import com.example.springbootmaven.Entities.User;
import com.example.springbootmaven.Entities.UserLocks;
import com.example.springbootmaven.Repositories.UserLocksRepository;
import com.example.springbootmaven.Services.LockService;
import com.example.springbootmaven.Services.UserLocksService;
import com.example.springbootmaven.Services.UserService;
import com.fasterxml.jackson.databind.jsonFormatVisitors.JsonAnyFormatVisitor;
import com.sun.tools.jconsole.JConsoleContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.boot.configurationprocessor.json.JSONTokener;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;


import javax.sql.DataSource;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/api/locks/user")
public class LockUser {


    @Autowired
    public LockService lockService;
    @Autowired
    public UserLocksService userLocksService;

    @Autowired
    public UserLocksRepository userLocksRepository;
    @Autowired
    public UserService userService;



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


    /**
     *
     * @param lockId
     * @param token
     * @param fechaInicio
     * @param fechaFin
     */
    @PostMapping("/reserve")
    public void reserve(@RequestParam("lockId") int lockId, @RequestParam("token") String token, @RequestParam("fechaInicio") String fechaInicio,@RequestParam("fechaFin") String fechaFin ) {

        SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");




        User userFound = userService.findByToken(token);
        Locks lockFound = lockService.lockRepository.findById(lockId).orElse(new Locks());



        try {
            Date startDate=dateFormat.parse(fechaInicio);
            Date finishDate=dateFormat.parse(fechaFin);

            UserLocks userLocks = new UserLocks(lockFound,userFound,"Closed",startDate ,finishDate );

            userLocksRepository.save(userLocks);
        } catch (Exception e) {
            System.out.println(e);
        }





    }
    public static class MyData {
        @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
        private Date date;

        public Date getDate() {
            return date;
        }

        public void setDate(Date date) {
            this.date = date;
        }
    }


}
