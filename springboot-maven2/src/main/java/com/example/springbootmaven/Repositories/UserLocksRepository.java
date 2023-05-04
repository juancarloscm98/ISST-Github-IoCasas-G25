package com.example.springbootmaven.Repositories;

import com.example.springbootmaven.Entities.User;
import com.example.springbootmaven.Entities.UserLocks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserLocksRepository extends JpaRepository<UserLocks,Integer> {



}
