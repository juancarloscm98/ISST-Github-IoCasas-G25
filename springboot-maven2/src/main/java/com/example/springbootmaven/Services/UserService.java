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


    /**
     * Crea el usuario, asignandole un token
     * @param user
     */
    public void createUser(User user) {

        while(true) {
            //creamos un token aleatorio
            String tk = random();
        //    String token=getJWTToken(user.getUsername());
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


    /**
     * @return - String aleatorio entre 0 y 999
     */
    public String random(){
        int randomNumber = new Random().nextInt(1000);
        String randomSt = Integer.toString(randomNumber);
        return randomSt;
    }

//Comprobación de que el usuario existe o no

    /**
     * Comprueba si el usuario esta creado o ono mediante el username
     * @param user
     * @return - boolean
     * True si el usuario está creado
     * False si no está creado
     */
    public boolean isUserCreated(User user){
        System.out.println(user.getUsername());
        User u= userRepository.findByUserName(user.getUsername());

        return (u!=null);
    }

    /**
     * Devuelve todos los users
     * @return
     */
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    /**
     * Busca el user por su username
     * @param username
     * @return - User
     */
    public User findByUserName(String username){
        return userRepository.findByUserName(username);
    }
}
