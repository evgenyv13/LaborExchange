package com.laborExchange.coremodule.user.userFields.education;

import lombok.Data;

@Data
public class EducationDto {
    private Long id;
    private String university;

    public EducationDto(Education education) {
        this.id = education.getId();
        this.university = education.getUniversity();
    }
}
