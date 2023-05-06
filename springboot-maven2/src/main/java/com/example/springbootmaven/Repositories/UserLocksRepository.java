package com.example.springbootmaven.Repositories;

import com.example.springbootmaven.Entities.User;
import com.example.springbootmaven.Entities.UserLocks;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserLocksRepository extends JpaRepository<UserLocks,Integer> {

    @Query("select u from UserLocks  u where u.userId.Token=:token")
    List<UserLocks> getUserLocksByToken(String token);

    @Modifying
    @Transactional
    @Query("update UserLocks u set u.state=:state where u.lockId.lockId=:lockId")
    void setLockState(String lockId,String state);
}
