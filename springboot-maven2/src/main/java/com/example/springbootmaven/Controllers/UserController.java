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


    /**
     * POST /api/users/userRegister
     *Registro de usuario
     * @param user
     * @return -ResponseEntity
     */
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



    /**
     * POST /api/users/userRegistered
     * Obtencion de los usuarios registrados
     * @return - Lista de users
     */
    @GetMapping("/userRegistered")
    public List<User> userRegistered(){

        return userService.getAllUsers();
    }


/**
 * POST /api/users/login
 * Api login que recibe un OBJETO User y comprueba si el username y la contraseña existen en la bbdd
 * y en tal caso devolver dicho usuario con token incluido
 * @param user usuario que quiere loggearse
 * @return - User con el token ya asignado
 */
    @PostMapping  ("/login")
    public User loginUser(@RequestBody User user) {
        //Compruebo si el user esta creado, en caso de que si devuelvo el user con su token
        //HAY QUE CONTROLAR LA CONTRASEÑA TAMBIEN!! y ver como desencriptar
            if (userService.isUserCreated(user)) {
                //Devuelvo el user con ese username
               return userService.findByUserName(user.getUsername());
            }else {
                return new User();
            }
        }

}

