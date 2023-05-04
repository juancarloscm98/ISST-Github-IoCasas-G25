package com.example.springbootmaven.Controllers.User;

import com.example.springbootmaven.Entities.User;
import com.example.springbootmaven.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/users")
public class Login {

    @Autowired
    private UserService userService;

    /**
     * POST /api/users/login
     * Api login que recibe un OBJETO User y comprueba si el username y la contraseña existen en la bbdd
     * y en tal caso devolver dicho usuario con token incluido
     * @param user usuario que quiere loggearse
     * @return - User con el token ya asignado
     */
    @PostMapping("/login")
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
