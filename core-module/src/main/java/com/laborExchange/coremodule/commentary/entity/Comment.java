package com.laborExchange.coremodule.commentary.entity;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.laborExchange.coremodule.commentary.dto.CommentDto;
import com.laborExchange.coremodule.user.entity.User;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.sql.Timestamp;
import java.util.Map;

@Data
@Entity
@Table(name = "commentary")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "from_user")
    private User fromUser;
    @ManyToOne
    @JoinColumn(name = "for_user")
    private User forUser;
    @Size(max = 255)
    private String commentaryText;
    private Timestamp commentaryDate;

    public static Map<String, Object> toMap(CommentDto commentDto) {
        ObjectMapper oMapper = new ObjectMapper();
        Map<String, Object> map = oMapper.convertValue(commentDto, Map.class);
        return map;
    }

}
