package com.example.springbootmaven.Entities;

import jakarta.persistence.*;
import org.springframework.data.jpa.repository.Lock;

import java.util.Date;

@Entity
@Table(name="Records")
public class Records {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int recordId;
    @ManyToOne
    @JoinColumn(name="userId")
    public User userId;
    @ManyToOne
    @JoinColumn(name="lockId")
    public Locks lockId;

    @Column(name="dateOfRegister")
    @Temporal(TemporalType.DATE)
    public Date dateOfRegister;

    public Records(User userId, Locks lockId, Date dateOfRegister) {
        this.userId = userId;
        this.lockId = lockId;
        this.dateOfRegister = dateOfRegister;
    }

    public Records() {
    }

    public int getRecordId() {
        return recordId;
    }

    public void setRecordId(int recordId) {
        this.recordId = recordId;
    }

    public User getUserId() {
        return userId;
    }

    public void setUserId(User userId) {
        this.userId = userId;
    }

    public Locks getLockId() {
        return lockId;
    }

    public void setLockId(Locks lockId) {
        this.lockId = lockId;
    }

    public Date getDateOfRegister() {
        return dateOfRegister;
    }

    public void setDateOfRegister(Date dateOfRegister) {
        this.dateOfRegister = dateOfRegister;
    }
}
