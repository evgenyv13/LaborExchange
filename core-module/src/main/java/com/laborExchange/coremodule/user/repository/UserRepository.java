package com.laborExchange.coremodule.user.repository;

import com.laborExchange.coremodule.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findUserByMail(String email);

    User findUserByUsername(String username);

    User findUserById(Long id);
}
