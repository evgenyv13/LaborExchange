package com.laborExchange.coremodule.user.userFields.languageLevel;

import lombok.Data;

@Data
public class LanguageLevelDto {
    private Long id;
    private String language;
    private String language_level;

    public LanguageLevelDto(LanguageLevel languageLevelEntity) {
        this.id = languageLevelEntity.getId();
        this.language = languageLevelEntity.getLanguage();
        this.language_level = languageLevelEntity.getLanguage_level();
    }
}
