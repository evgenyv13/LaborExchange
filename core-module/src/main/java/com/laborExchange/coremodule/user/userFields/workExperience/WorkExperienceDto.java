package com.laborExchange.coremodule.user.userFields.workExperience;

import lombok.Data;

@Data
public class WorkExperienceDto {
    private Long id;
    private String companyName;
    private String position;
    private String description;

    public WorkExperienceDto(WorkExperience workExperience) {
        this.id = workExperience.getId();
        this.companyName = workExperience.getCompanyName();
        this.position = workExperience.getPosition();
        this.description = workExperience.getDescription();
    }
}
