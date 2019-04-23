package com.laborExchange.coremodule.commentary.repository;

import com.laborExchange.coremodule.commentary.entity.Comment;
import com.laborExchange.coremodule.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    @EntityGraph(attributePaths = "forUser")
    Page<Comment> findCommentByFromUserOrderByCommentaryDateDesc(User user, Pageable pageable);

    @EntityGraph(attributePaths = "fromUser")
    Page<Comment> findCommentByForUserOrderByCommentaryDateDesc(User user, Pageable pageable);

}
