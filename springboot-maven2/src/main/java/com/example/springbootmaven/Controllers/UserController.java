package com.example.springbootmaven.Controllers;

import com.example.springbootmaven.Entities.User;
import com.example.springbootmaven.Repositories.UserRepository;
import com.example.springbootmaven.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
@CrossOrigin
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/prueba")
    public String prueba(){
        return ("la api funciona con postman en codeWITHME");
    }


    //REGISTRO DEL USUARIO
    @PostMapping("/userRegister")
    public ResponseEntity<String> createUser(@RequestBody User user) {

        //Compruebo de que que exista o no el usuario
    if(userService.isUserCreated(user)){
        return new ResponseEntity<>("Este usuario ya existe", HttpStatus.BAD_REQUEST);
    } else {

         userService.createUser(user);
        return new ResponseEntity<>("Nuevo usuario creado", HttpStatus.CREATED);
    }

}

//Obtencion de los usuarios registrados
@GetMapping("/userRegistered")
    public List<User> userRegistered(){

        return userService.getAllUsers();
    }


//api login que recibe un OBJETO User y comprueba si el username y la contraseña existen en la bbdd
    // y en tal caso devolver dicho usuario con token incluido

    @PostMapping  ("/login")
    public User loginUser(@RequestBody User user) {
        //Compruebo si el user esta creado, en caso de que si devuelvo el user con su token
            if (userService.isUserCreated(user)) {
                //Devuelvo el user con ese username
               return userService.findByUserName(user.getUsername());
            }else {
                return new User();
            }
        }

}

