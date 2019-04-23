package com.laborExchange.coremodule.user.service;

import com.laborExchange.coremodule.commentary.dto.CommentDto;
import com.laborExchange.coremodule.commentary.entity.Comment;
import com.laborExchange.coremodule.project.dto.ProjectDto;
import com.laborExchange.coremodule.user.dto.UserDto;
import com.laborExchange.coremodule.user.entity.User;
import com.laborExchange.coremodule.user.userFields.education.Education;
import com.laborExchange.coremodule.user.userFields.education.EducationDto;
import com.laborExchange.coremodule.user.userFields.languageLevel.LanguageLevel;
import com.laborExchange.coremodule.user.userFields.languageLevel.LanguageLevelDto;
import com.laborExchange.coremodule.user.userFields.userSkill.UserSkill;
import com.laborExchange.coremodule.user.userFields.userSkill.UserSkillDto;
import com.laborExchange.coremodule.user.userFields.workExperience.WorkExperience;
import com.laborExchange.coremodule.user.userFields.workExperience.WorkExperienceDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface UserService {

    Page<CommentDto> getCommentsISend(User user, Pageable pageable);

    Page<CommentDto> getCommentsSendingForMe(User user, Pageable pageable);

    UserDto getUserInfo(String id);

    User getUserById(String id);

    User findUserById(String id);

    CommentDto createComment(Comment comment, User user, String commitToUserId);

    UserDto updateUserInfo(User user, User newUser);

    EducationDto createEducation(Education education, User user);

    LanguageLevelDto createLanguageLevel(LanguageLevel languageLevel, User user);

    WorkExperienceDto createWorkExperience(WorkExperience workEperience, User user);

    UserSkillDto createUserSkill(UserSkill userSkill, User user);

    Boolean deleteEducation(String ids, User user);

    Boolean deleteLanguageLevel(String ids, User user);

    Boolean deleteWorkExperience(String ids, User user);

    Boolean deleteUserSkill(String ids, User user);

    List<ProjectDto> getProjects(User user);

    User findUserByUsername(String username);
}
