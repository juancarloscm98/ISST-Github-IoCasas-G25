package com.example.springbootmaven.Entities;

import jakarta.persistence.*;

import java.util.concurrent.locks.Lock;

@Entity
@Table(name="UserLocks")
public class UserLocks {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int userLocksId;

    @ManyToOne
    @JoinColumn(name = "lockId")
    public Locks lockId;


    //User que tiene asignada la cerradura
    //NO el propietario
    @ManyToOne
    @JoinColumn(name="userId")
    public User user;


    public int getUserLocksId() {
        return userLocksId;
    }

    public void setUserLocksId(int userLocksId) {
        this.userLocksId = userLocksId;
    }

    public Locks getLockId() {
        return lockId;
    }

    public void setLockId(Locks lockId) {
        this.lockId = lockId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
