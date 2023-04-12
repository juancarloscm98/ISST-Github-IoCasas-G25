package com.example.springbootmaven.Services;

import com.example.springbootmaven.Entities.User;
import com.example.springbootmaven.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;



    public void createUser(User user) {

        while(true) {
            //creamos un token aleatorio
            String tk = random();
            //buscamos al user con ese token(si existiera)
            boolean userWithoutToken = userRepository.findByToken(tk) == null;
            //Si el token no lo usa nadie userWithoutToken sera nulo y por lo tanto podremos usarlo.
            if (userWithoutToken) {
                user.setToken(tk);
                break;
            }
            continue;
        }
        //Guardo el usuario
        userRepository.save(user);

    }


    //metodo para ver si fue eliminado con exito,
    // el metodo intentara primero eliminar el usuario
    public Boolean deleteUser(User user) {
        try {
            userRepository.delete(user);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    //Funcion para la creación de un token aleatorio
    public String random(){
        int randomNumber = new Random().nextInt(1000); // Genera un número aleatorio entre 0 y 999
        String randomSt = Integer.toString(randomNumber);
        return randomSt;
    }

//Comprobación de que el usuario existe o no
    public boolean isUserCreated(User user){
        System.out.println(user.getUsername());
        User u= userRepository.findByUserName(user.getUsername());

        return (u!=null);
    }

    //Devuelve una lista de todos los usuarios
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
/*
    //recibe (nombre de usuario y contraseña) y verifique si son válidas.
    public boolean validateLogin(String username, String password) {
        User user = userRepository.findByUsername(username);
        return user != null && user.getPassword().equals(password);
    }
*/

    public User findByUserName(String username){
        User u = userRepository.findByUserName(username);
        return u;
    }
}
