package com.example.springbootmaven.Repositories;

import com.example.springbootmaven.Entities.Locks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LockRepository extends JpaRepository<Locks,Integer> {
}
