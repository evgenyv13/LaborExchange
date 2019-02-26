package com.laborExchange.coremodule.user.repository;

import com.laborExchange.coremodule.user.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

    User findUserByMail(String email);

    User findUserByUsername(String username);

    User findUserById(Long id);
}
