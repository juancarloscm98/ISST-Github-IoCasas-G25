package com.example.springbootmaven.Repositories;

import com.example.springbootmaven.Entities.Locks;
import com.example.springbootmaven.Entities.Records;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecordRepository extends JpaRepository<Records,Integer> {
    //Query, que busca dentro de los records, un cierto usuario y sus cerraduras
    @Query("Select u from Records u WHERE u.userId.Token like :token")
    List<Records> findByUserIdToken(String token);
}
