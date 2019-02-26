package com.laborExchange.coremodule.commentary.service;

import com.laborExchange.coremodule.commentary.dto.CommentDto;
import com.laborExchange.coremodule.commentary.entity.Comment;
import com.laborExchange.coremodule.commentary.repository.CommentRepository;
import com.laborExchange.coremodule.user.entity.User;
import com.laborExchange.coremodule.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Clock;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class CommentService {
    @Autowired
    CommentRepository commentRepository;
    @Autowired
    UserRepository userRepository;

    public CommentDto createComment(Comment comment, User user, String commitToUserId) {
        if (comment == null || user == null || comment.getCommentaryText() == null) return null;
        Long forUserId = Long.parseLong(commitToUserId);
        if (forUserId == null) return null;
        Optional<User> forUser = userRepository.findById(forUserId);
        if (!forUser.isPresent() || forUser.get().getId() == user.getId()) return null;
        comment.setForUser(forUser.get());
        comment.setFromUser(user);
        LocalDateTime localDateTime = LocalDateTime.now(Clock.systemUTC());
        Timestamp timestamp = Timestamp.valueOf(localDateTime);

        comment.setCommentaryDate(timestamp);
        return new CommentDto(commentRepository.save(comment));
    }
}
