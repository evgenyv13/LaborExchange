package com.laborExchange.coremodule.commentary.repository;

import com.laborExchange.coremodule.commentary.entity.Comment;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.CrudRepository;

@Repository
public interface CommentRepository extends CrudRepository<Comment, Long> {
}
