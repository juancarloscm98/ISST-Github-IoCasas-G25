package com.example.springbootmaven.Entities;

import jakarta.persistence.*;

import java.util.Date;
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
    public User userId;

    @Column(name="state")
    public String state;

    @Column(name="startDate")
    @Temporal(TemporalType.DATE)
    public Date startDate;


    @Column(name="finishDate")
    @Temporal(TemporalType.DATE)
    public Date finishDate;

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
        return userId;
    }

    public void setUser(User user) {
        this.userId = user;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public User getUserId() {
        return userId;
    }

    public void setUserId(User userId) {
        this.userId = userId;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getFinishDate() {
        return finishDate;
    }

    public void setFinishDate(Date finishDate) {
        this.finishDate = finishDate;
    }

    public UserLocks(Locks lockId, User userId, String state, Date startDate, Date finishDate) {
        this.lockId = lockId;
        this.userId = userId;
        this.state = state;
        this.startDate = startDate;
        this.finishDate = finishDate;
    }

    public UserLocks() {
    }
}
