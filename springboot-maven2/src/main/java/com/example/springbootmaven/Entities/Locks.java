package com.example.springbootmaven.Entities;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "Locks")
public class Locks {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int lockId;

    @Column(name = "lockName")
    public String lockName;
    @Column(name = "lockIdentifier")
    public String lockIdentifier;

    @Column(name="state")
    public String state;

    @Column(name="dateOfRegister")
    @Temporal(TemporalType.DATE)
    public Date dateOfRegister;
    public int getLockId() {
        return lockId;
    }

    public void setLockId(int lockId) {
        this.lockId = lockId;
    }

    public String getLockName() {
        return lockName;
    }

    public void setLockName(String lockName) {
        this.lockName = lockName;
    }

    public String getLockIndentifier() {
        return lockIdentifier;
    }

    public void setLockIndentifier(String lockIndentifier) {
        this.lockIdentifier = lockIndentifier;
    }

    public Locks(String lockName, String lockIndentifier) {

        this.lockName = lockName;
        this.lockIdentifier = lockIndentifier;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public Date getDateOfRegister() {
        return dateOfRegister;
    }

    public void setDateOfRegister(Date dateOfRegister) {
        this.dateOfRegister = dateOfRegister;
    }

    public Locks() {
        super();
    }
}
