package com.example.springbootmaven.Entities;

import jakarta.persistence.*;
import org.springframework.data.jpa.repository.Lock;

import java.util.Date;

@Entity
@Table(name="Records")
public class Records {

    /**
     * Habría que añadir algun campo:
     * Uno para controlar si la cerradura está abierta o cerrada
     * Otro para comprobar la fecha en la que se ha abierto
     * Otro para comprobar la fecha en la que se ha cerrado
     *
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int recordId;
    @ManyToOne
    @JoinColumn(name="userId")
    public User userId;
    @ManyToOne
    @JoinColumn(name="lockId")
    public Locks lockId;

    @Column(name="dateOfChange")
    @Temporal(TemporalType.DATE)
    public Date dateOfChange;

    @Column(name="state")
    public String state;

    public Records(User userId, Locks lockId, Date dateOfRegister, Date dateOfChange,String state) {
        this.userId = userId;
        this.lockId = lockId;
        this.dateOfChange = dateOfChange;
        this.state=state;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public Records() {
    }

    public Date getDateOfChange() {
        return dateOfChange;
    }

    public void setDateOfChange(Date dateOfChange) {
        this.dateOfChange = dateOfChange;
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
    
}
