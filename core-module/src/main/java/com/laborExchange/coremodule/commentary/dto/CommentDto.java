package com.laborExchange.coremodule.commentary.dto;

import com.laborExchange.coremodule.commentary.entity.Comment;
import com.laborExchange.coremodule.user.dto.UserDto;
import com.laborExchange.coremodule.user.dto.UserDtoComment;
import lombok.Data;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Data
public class CommentDto {
    private Long id;
    private UserDtoComment fromUser;
    private UserDtoComment forUser;

    private String commentaryText;
    private LocalDateTime commentaryDate;

    public CommentDto(Comment comment) {
        this.id = comment.getId();
        this.fromUser = new UserDtoComment(comment.getFromUser());
        this.forUser = new UserDtoComment(comment.getForUser());
        this.commentaryText = comment.getCommentaryText();
        this.commentaryDate = comment.getCommentaryDate().toLocalDateTime();
    }
}
