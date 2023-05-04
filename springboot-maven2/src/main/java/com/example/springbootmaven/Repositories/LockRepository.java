package com.example.springbootmaven.Repositories;

import com.example.springbootmaven.Entities.Locks;
import com.example.springbootmaven.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Repository
public interface LockRepository extends JpaRepository<Locks,Integer> {

    @Modifying
    @Query("Update Locks u set u.state =:state where u.lockIdentifier=:lockIdentifier")
    void updateState(@Param("lockIdentifier") String lockIdentifier,@Param("state") String state);

    @Query("Select u from Locks u WHERE u.lockIdentifier =:lockIdentifier" )
    Locks findByLockIndetifier(String lockIdentifier);

    @Query("Select u from Locks u WHERE u.userId.Token =:token" )
    List<Locks> findByTokenUser(String token);



}
