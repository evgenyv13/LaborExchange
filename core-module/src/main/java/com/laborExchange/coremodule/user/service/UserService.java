package com.laborExchange.coremodule.user.service;

import com.laborExchange.coremodule.commentary.dto.CommentDto;
import com.laborExchange.coremodule.commentary.entity.Comment;
import com.laborExchange.coremodule.odt.Odt;
import com.laborExchange.coremodule.project.dto.ProjectDto;
import com.laborExchange.coremodule.project.entity.Project;
import com.laborExchange.coremodule.projectOwners.ProjectOwnersRepository;
import com.laborExchange.coremodule.user.dto.UserDto;
import com.laborExchange.coremodule.user.entity.User;
import com.laborExchange.coremodule.user.repository.UserRepository;
import com.laborExchange.coremodule.user.userFields.education.Education;
import com.laborExchange.coremodule.user.userFields.education.EducationDto;
import com.laborExchange.coremodule.user.userFields.education.EducationRepository;
import com.laborExchange.coremodule.user.userFields.languageLevel.LanguageLevel;
import com.laborExchange.coremodule.user.userFields.languageLevel.LanguageLevelDto;
import com.laborExchange.coremodule.user.userFields.languageLevel.LanguageLevelRepository;
import com.laborExchange.coremodule.user.userFields.userSkill.UserSkill;
import com.laborExchange.coremodule.user.userFields.userSkill.UserSkillDto;
import com.laborExchange.coremodule.user.userFields.userSkill.UserSkillRepository;
import com.laborExchange.coremodule.user.userFields.workExperience.WorkExperience;
import com.laborExchange.coremodule.user.userFields.workExperience.WorkExperienceDto;
import com.laborExchange.coremodule.user.userFields.workExperience.WorkExperienceRepository;
import org.apache.xmlbeans.impl.xb.xsdschema.Public;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    EducationRepository educationRepository;
    @Autowired
    LanguageLevelRepository languageLevelRepository;
    @Autowired
    WorkExperienceRepository workExperienceRepository;
    @Autowired
    UserSkillRepository userSkillRepository;
    @Autowired
    private ProjectOwnersRepository projectOwnersRepository;


    public List<CommentDto> getCommentsISend(User user) {
        List<Comment> comments = user.getImCommented();
        List<CommentDto> orderDtoCalendars = Odt.convertLists(comments, item -> new CommentDto(item));
        return orderDtoCalendars;
    }

    public List<CommentDto> getCommentsSendingForMe(User user) {
        List<Comment> comments = user.getCommentsForMe();
        List<CommentDto> orderDtoCalendars = Odt.convertLists(comments, item -> new CommentDto(item));
        return orderDtoCalendars;
    }

    public UserDto getUserInfo(String id) {
        Long userId = Long.parseLong(id);
        if (userId == null) return null;
        User user = userRepository.findUserById(userId);
        if (user == null) return null;
        return new UserDto(user);
    }

    public User getUserById(String id) {
        Long userId = Long.parseLong(id);
        if (userId == null) return null;
        return userRepository.findUserById(userId);
    }

    public UserDto updateUserInfo(User user, User newUser) {
        if (user == null || newUser == null) return null;
        if(newUser.getMail()!= null) user.setMail(newUser.getMail());
        if(newUser.getWebsite()!= null) user.setWebsite(newUser.getWebsite());
        // user urls
        if(newUser.getLinkedin()!= null) user.setLinkedin(newUser.getLinkedin());
        if(newUser.getGmail()!= null) user.setGmail(newUser.getGmail());
        if(newUser.getTwitter()!= null) user.setTwitter(newUser.getTwitter());
        if(newUser.getGithub()!= null) user.setGithub(newUser.getGithub());
        if(newUser.getYoutube()!= null) user.setYoutube(newUser.getYoutube());
        if(newUser.getAboutMe()!= null) user.setAboutMe(newUser.getAboutMe());

        return new UserDto(userRepository.save(user));
    }

    public EducationDto createEducation(Education education,User user){
        if(education==null || user==null || education.getUniversity().trim().length()==0) return null;
        education.setUser(user);
        education = educationRepository.save(education);
        return new EducationDto(education);
    }

    public LanguageLevelDto createLanguageLevel(LanguageLevel languageLevel, User user){
        if(languageLevel==null || user==null || languageLevel.getLanguage().trim().length()==0 || languageLevel.getLanguage_level().trim().length()==0) return null;
        languageLevel.setUser(user);
        languageLevel = languageLevelRepository.save(languageLevel);
        return new LanguageLevelDto(languageLevel);
    }

    public WorkExperienceDto createWorkExperience(WorkExperience workEperience, User user){
        if(workEperience==null || user==null || workEperience.getCompanyName().trim().length()==0 ) return null;
        workEperience.setUser(user);
        workEperience = workExperienceRepository.save(workEperience);
        return new WorkExperienceDto(workEperience);
    }

    public UserSkillDto createUserSkill(UserSkill userSkill, User user){
        if(userSkill==null || user==null || userSkill.getSkill().trim().length()==0 ) return null;
        userSkill.setUser(user);
        userSkill = userSkillRepository.save(userSkill);
        return new UserSkillDto(userSkill);
    }

    public Boolean deleteEducation(String ids,User user){
        Long id = Long.parseLong(ids);
        if(user==null || id==null) return null;
        Optional<Education> education = educationRepository.findById(id);
        if(!education.isPresent() || education.get().getUser().getId()!=user.getId()) return false;
        educationRepository.delete(education.get());
        return true;
    }

    public Boolean deleteLanguageLevel(String ids, User user){
        Long id = Long.parseLong(ids);
        if(user==null || id==null) return null;
        Optional<LanguageLevel> languageLevel = languageLevelRepository.findById(id);
        if(!languageLevel.isPresent() || languageLevel.get().getUser().getId()!=user.getId()) return false;
        languageLevelRepository.delete(languageLevel.get());
        return true;
    }

    public Boolean deleteWorkExperience(String ids,User user){
        Long id = Long.parseLong(ids);
        if(user==null || id==null) return null;
        Optional<WorkExperience> workEperience = workExperienceRepository.findById(id);
        if(!workEperience.isPresent() || workEperience.get().getUser().getId()!=user.getId()) return false;
        workExperienceRepository.delete(workEperience.get());
        return true;
    }

    public Boolean deleteUserSkill(String ids,User user){
        Long id = Long.parseLong(ids);
        if(user==null || id==null) return null;
        Optional<UserSkill> userSkill = userSkillRepository.findById(id);
        if(!userSkill.isPresent() || userSkill.get().getUser().getId()!=user.getId()) return false;
        userSkillRepository.delete(userSkill.get());
        return true;
    }

    public List<ProjectDto> getProjects(User user) {
        List<Project> projects = user.getOwnedMainProject();
        List<ProjectDto> projectDtos = Odt.convertLists(projects, item -> new ProjectDto(item));
        return projectDtos;
    }
}
