package com.example.springbootmaven.Controllers.User;

import com.example.springbootmaven.Entities.User;
import com.example.springbootmaven.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin
@RestController
@RequestMapping("/api/users")
public class Register {
    @Autowired
    private UserService userService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    /**
     * Registro de usuario
     * @param user
     * @return
     */
    @PostMapping("/register")
    public ResponseEntity<String> createUser(@RequestBody User user) {

        //Compruebo de que que exista o no el usuario
        if(userService.isUserCreated(user)){
            return new ResponseEntity<>("Este usuario ya existe", HttpStatus.BAD_REQUEST);
        } else {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userService.createUser(user);
            return new ResponseEntity<>("Nuevo usuario creado", HttpStatus.CREATED);
        }

    }

    /**
     * POST /api/users/userRegistered
     * Obtencion de los usuarios registrados
     * @return - Lista de users
     */
    @GetMapping("/userRegistered")
    public List<User> userRegistered(){

        return userService.getAllUsers();
    }
}
