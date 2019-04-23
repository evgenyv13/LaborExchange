package com.laborExchange.coremodule.user.dto;

import com.laborExchange.coremodule.odt.Odt;
import com.laborExchange.coremodule.user.entity.User;
import com.laborExchange.coremodule.user.entity.UserRole;
import com.laborExchange.coremodule.user.userFields.education.EducationDto;
import com.laborExchange.coremodule.user.userFields.languageLevel.LanguageLevelDto;
import com.laborExchange.coremodule.user.userFields.userSkill.UserSkillDto;
import com.laborExchange.coremodule.user.userFields.workExperience.WorkExperienceDto;
import lombok.Data;

import java.util.List;

@Data
public class UserDetailPageDto {
    private Long id;
    private String username;
    private String mail;
    private String website;
    private UserRole userRole;
    private String skills;

    private String linkedin;
    private String gmail;
    private String twitter;
    private String github;
    private String youtube;
    private String aboutMe;

    private List<WorkExperienceDto> workExperiences;
    private List<EducationDto> educations;
    private List<LanguageLevelDto> languageLevels;
    private List<UserSkillDto> userSkills;

    public UserDetailPageDto(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.mail = user.getMail();
        this.website = user.getWebsite();
        this.userRole = user.getUserRole();
        this.skills = user.getSkills();

        this.linkedin = user.getLinkedin();
        this.gmail = user.getGmail();
        this.twitter = user.getTwitter();
        this.github = user.getGithub();
        this.youtube = user.getYoutube();
        this.aboutMe = user.getAboutMe();

        this.workExperiences = Odt.convertLists(user.getUserWorkExperience(), WorkExperienceDto::new);
        this.educations = Odt.convertLists(user.getEducations(), EducationDto::new);
        this.languageLevels = Odt.convertLists(user.getLanguageLevels(), LanguageLevelDto::new);
        this.userSkills = Odt.convertLists(user.getUserSkills(), UserSkillDto::new);
    }
}
