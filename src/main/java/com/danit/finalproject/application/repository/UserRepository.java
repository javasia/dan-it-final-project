package com.danit.finalproject.application.repository;

import com.danit.finalproject.application.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

  List<User> findAllByEmailStartingWithIgnoreCase(String email);

  User findByEmail(String email);

  User findByToken(String token);

}
