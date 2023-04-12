package com.example.springbootmaven.Repositories;

import com.example.springbootmaven.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    //Busqueda de un cierto usuario con un nombre concreto
    @Query("Select u from User u WHERE u.Username =:username" )
    User findByUserName(String username);

    //Busqueda de un cierto usuario con un token específico
    @Query("Select u from User u WHERE u.Token =:token" )
    User findByToken(String token);


}
