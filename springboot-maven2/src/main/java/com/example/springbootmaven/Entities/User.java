package com.example.springbootmaven.Entities;

import jakarta.persistence.*;
@Entity
@Table(name = "User")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;

    @Column(name="Usertype",length = 50)
    private String Usertype;

    @Column(name="Username",length = 50)
    private String Username;

    @Column(name="Password",length = 50)
    private String Password;

    @Column(name="Token",length = 50)
    private String Token;

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getUsertype() {
        return Usertype;
    }

    public void setUsertype(String usertype) {
        Usertype = usertype;
    }

    public String getUsername() {
        return Username;
    }

    public void setUsername(String username) {
        Username = username;
    }

    public String getPassword() {
        return Password;
    }

    public void setPassword(String password) {
        Password = password;
    }

    public String getToken() {
        return Token;
    }

    public void setToken(String token) {
        Token = token;
    }




    //Sin token
    public User(String usertype, String username, String password) {
        super();
        Usertype = usertype;
        Username = username;
        Password = password;
        System.out.println("usuario creado");
    }

    public User() {
        super();
    }
}