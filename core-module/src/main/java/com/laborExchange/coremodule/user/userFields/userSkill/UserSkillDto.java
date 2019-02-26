package com.laborExchange.coremodule.user.userFields.userSkill;

import lombok.Data;

@Data
public class UserSkillDto {
    private Long id;
    private String skill;

    public UserSkillDto(UserSkill userSkill) {
        this.id = userSkill.getId();
        this.skill = userSkill.getSkill();
    }
}
