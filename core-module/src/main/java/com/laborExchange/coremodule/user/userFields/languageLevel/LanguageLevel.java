package com.laborExchange.coremodule.user.userFields.languageLevel;

import com.laborExchange.coremodule.user.entity.User;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Entity
@Data
@Table(name = "language_levels")
public class LanguageLevel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Size(max = 30)
    private String language;
    @Size(max = 3)
    private String language_level;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
