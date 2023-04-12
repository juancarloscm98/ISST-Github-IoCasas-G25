package com.example.springbootmaven.Entities;

import jakarta.persistence.*;

@Entity
@Table(name = "Locks")
public class Locks {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int lockId;
    @Column(name = "lockName")
    private String lockName;
    @Column(name = "lockIdentifier")
    private String lockIdentifier;

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

    public Locks() {
        super();
    }
}
