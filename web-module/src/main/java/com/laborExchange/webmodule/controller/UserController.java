package com.laborExchange.webmodule.controller;

import com.laborExchange.coremodule.user.service.UserService;
import com.laborExchange.coremodule.commentary.dto.CommentDto;
import com.laborExchange.coremodule.commentary.entity.Comment;
import com.laborExchange.coremodule.project.dto.ProjectDto;
import com.laborExchange.coremodule.project.entity.Project;
import com.laborExchange.coremodule.project.service.ProjectService;
import com.laborExchange.coremodule.user.dto.UserDetailPageDto;
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
import com.laborExchange.webmodule.service.CommonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@PreAuthorize("hasAuthority('ROLE_USER')")
@CrossOrigin
@RestController
@RequestMapping(value = "/api")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private CommonService commonService;
    @Autowired
    private ProjectService projectService;

    /**
     * @return Full User Dto , with skills etc
     */
    @RequestMapping(value = "/users/myPage/getDetailUserInfo", method = RequestMethod.GET)
    public UserDetailPageDto getMyPageDetailUserInfo() {
        return new UserDetailPageDto(commonService.getCurrentUser());
    }

    /**
     * @param userId
     * @return user small dto
     */
    @RequestMapping(value = "/users/{id}", method = RequestMethod.GET)
    public UserDto getUserInfo(@PathVariable("id") String userId) {
        return userService.getUserInfo(userId);
    }


    /**
     * @param userId
     * @return User Full Dto
     */
    @RequestMapping(value = "/users/{id}/getDetailUserInfo", method = RequestMethod.GET)
    public UserDetailPageDto getDetailUserInfo(@PathVariable("id") String userId) {
        return new UserDetailPageDto(userService.getUserById(userId));
    }

    /**
     * @param *FormData , where you may put UserEntity Rows ( mail , web site , communicate links ) , about me;
     * @return UserDto
     */
    @PutMapping(value = "/users/myPage/update")
    public UserDto updateUser(User newUser) {
        User user = commonService.getCurrentUser();
        return userService.updateUserInfo(user, newUser);
    }

    /**
     * this method return's comment's that send user
     */
    @RequestMapping(value = "/users/myPage/getCommentsISend", method = RequestMethod.GET)
    public Page<CommentDto> getCommentsISend(Pageable pageable) {
        return userService.getCommentsISend(commonService.getCurrentUser(),pageable);
    }

    /**
     * method used for getting comments sending for current user
     */
    @RequestMapping(value = "/users/myPage/comments", method = RequestMethod.GET)
    public Page<CommentDto>  getCommentsForMe(Pageable pageable) {
        return userService.getCommentsSendingForMe(commonService.getCurrentUser(),pageable);
    }

    /**
     * method used for getting comments sending for some user
     */
    @RequestMapping(value = "/users/{userId}/comments", method = RequestMethod.GET)
    public Page<CommentDto> getUserComments(@PathVariable("userId") String userId,Pageable pageable) {
        User user = userService.findUserById(userId);
        return userService.getCommentsSendingForMe(user,pageable);
    }

    /**
     * @param userId
     * @param *FormData commentaryText
     * @return CommentDto ( time in UTC )
     */
    @PostMapping(value = "/users/{userId}/createComment")
    public CommentDto createComment(@PathVariable("userId") String userId, @ModelAttribute Comment comment) {
        User user = commonService.getCurrentUser();
        return userService.createComment(comment, user, userId);
    }

    /* ------------- user info  --------------*/

    /**
     * @param *FormData , should contain only one row : education
     * @return Added Row Of education
     */
    @PostMapping(value = "/users/myPage/update/createEducation")
    public EducationDto createEducation(@ModelAttribute Education education) {
        User user = commonService.getCurrentUser();
        return userService.createEducation(education, user);
    }


    @PostMapping(value = "/users/myPage/update/createLanguageLevel")
    public LanguageLevelDto createLanguageLevel(@ModelAttribute LanguageLevel languageLevel) {
        User user = commonService.getCurrentUser();
        return userService.createLanguageLevel(languageLevel, user);
    }

    @PostMapping(value = "/users/myPage/update/createWorkExperience")
    public WorkExperienceDto createWorkExperience(@ModelAttribute WorkExperience workExperience) {
        User user = commonService.getCurrentUser();
        return userService.createWorkExperience(workExperience, user);
    }

    @PostMapping(value = "/users/myPage/update/createUserSkill")
    public UserSkillDto createUserSkill(@ModelAttribute UserSkill userSkill) {
        User user = commonService.getCurrentUser();
        return userService.createUserSkill(userSkill, user);
    }

    /**
     * @param *RawFormat only int value of education id
     * @return true or throw exception
     */
    @DeleteMapping(value = "/users/myPage/update/deleteEducation")
    public Boolean deleteEducation(@RequestBody String educationId) {
        User user = commonService.getCurrentUser();
        return userService.deleteEducation(educationId, user);
    }

    @DeleteMapping(value = "/users/myPage/update/deleteLanguageLevel")
    public Boolean deleteLanguageLevel(@RequestBody String languageLevelId) {
        User user = commonService.getCurrentUser();
        return userService.deleteLanguageLevel(languageLevelId, user);
    }

    @DeleteMapping(value = "/users/myPage/update/deleteWorkExperience")
    public Boolean deleteWorkExperience(@RequestBody String workExperienceId) {
        User user = commonService.getCurrentUser();
        return userService.deleteWorkExperience(workExperienceId, user);
    }

    @DeleteMapping(value = "/users/myPage/update/deleteUserSkill")
    public Boolean deleteUserSkill(@RequestBody String userSkillId) {
        User user = commonService.getCurrentUser();
        return userService.deleteUserSkill(userSkillId, user);
    }

    /* ------------ projects ------------  */

    /**
     * @param *Url param page & size
     * @return *Page object with row content , that contain's list of ProjectDto
     */
    @GetMapping(value = "/users/myPage/ownedProjects")
    public Object getMyOwnedProjects(Pageable pageable) {
        User user = commonService.getCurrentUser();
        Page<Project> projects = projectService.getUserProjectsByPage(user, pageable);

        return projects.map(ProjectDto::new);
    }

    /**
     * @param *Url param page & size
     * @return *Page object with row content , that contain's list of  ProjectDto
     */
    @GetMapping(value = "/users/myPage/partnershipProjects")
    public Object getMyPartnershipProjects(Pageable pageable) {
        User user = commonService.getCurrentUser();
        Page<Project> projects = projectService.getPartnershipProjectsByPage(pageable, user);
        return projects.map(ProjectDto::new);
    }


}
