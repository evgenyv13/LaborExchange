package com.laborExchange.coremodule.user.service;

import com.laborExchange.coremodule.commentary.dto.CommentDto;
import com.laborExchange.coremodule.commentary.entity.Comment;
import com.laborExchange.coremodule.commentary.repository.CommentRepository;
import com.laborExchange.coremodule.common.exception.EntityNotFoundCustomException;
import com.laborExchange.coremodule.common.exception.UncorrectEntityException;
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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Clock;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final EducationRepository educationRepository;
    private final LanguageLevelRepository languageLevelRepository;
    private final WorkExperienceRepository workExperienceRepository;
    private final UserSkillRepository userSkillRepository;
    private final CommentRepository commentRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, EducationRepository educationRepository, LanguageLevelRepository languageLevelRepository, WorkExperienceRepository workExperienceRepository, UserSkillRepository userSkillRepository, ProjectOwnersRepository projectOwnersRepository, CommentRepository commentRepository) {
        this.userRepository = userRepository;
        this.educationRepository = educationRepository;
        this.languageLevelRepository = languageLevelRepository;
        this.workExperienceRepository = workExperienceRepository;
        this.userSkillRepository = userSkillRepository;
        this.commentRepository = commentRepository;
    }


    @Override
    public Page<CommentDto> getCommentsISend(User user, Pageable pageable) {
        return commentRepository.findCommentByFromUserOrderByCommentaryDateDesc(user,pageable).map(CommentDto::new);
    }

    @Override
    public Page<CommentDto> getCommentsSendingForMe(User user, Pageable pageable) {
        Page<CommentDto> comments = commentRepository.findCommentByForUserOrderByCommentaryDateDesc(user,pageable).map(CommentDto::new);
        return comments;
    }

    @Override
    public CommentDto createComment(Comment comment, User fromUser, String commitToUserId) {
        if (comment == null || comment.getCommentaryText().trim().length() == 0 ) {
            throw new UncorrectEntityException("Commentary text is empty");
        }

        User forUser = findUserById(commitToUserId);

        comment.setForUser(forUser);
        comment.setFromUser(fromUser);

        LocalDateTime localDateTime = LocalDateTime.now(Clock.systemUTC());
        Timestamp timestamp = Timestamp.valueOf(localDateTime);
        comment.setCommentaryDate(timestamp);

        return new CommentDto(commentRepository.save(comment));
    }

    @Override
    public UserDto getUserInfo(String id) {
        Long userId = Long.parseLong(id);
        User user = userRepository.findById(userId).orElseThrow(()-> {
            throw new EntityNotFoundCustomException("User with id " + userId + " is not found");
        });
        return new UserDto(user);
    }

    @Override
    public User getUserById(String id) {
        Long userId = Long.parseLong(id);
        return userRepository.findById(userId).orElseThrow(()-> {
            throw new EntityNotFoundCustomException("User with id " + userId + " is not found");
        });
    }

    @Override
    public User findUserById(String id) {
        Long userId = Long.parseLong(id);
        return userRepository.findById(userId).orElseThrow(()-> {
            throw new EntityNotFoundCustomException("User with id " + userId + " is not found");
        });
    }



    @Override
    public UserDto updateUserInfo(User user, User newUser) {
        if (user == null || newUser == null) throw new EntityNotFoundCustomException("New UserEntity is Empty");

        if (newUser.getMail() != null) user.setMail(newUser.getMail());
        if (newUser.getWebsite() != null) user.setWebsite(newUser.getWebsite());
        // user urls
        if (newUser.getLinkedin() != null) user.setLinkedin(newUser.getLinkedin());
        if (newUser.getGmail() != null) user.setGmail(newUser.getGmail());
        if (newUser.getTwitter() != null) user.setTwitter(newUser.getTwitter());
        if (newUser.getGithub() != null) user.setGithub(newUser.getGithub());
        if (newUser.getYoutube() != null) user.setYoutube(newUser.getYoutube());
        if (newUser.getAboutMe() != null) user.setAboutMe(newUser.getAboutMe());

        return new UserDto(userRepository.save(user));
    }

    @Override
    public EducationDto createEducation(Education education, User user) {
        if (education == null || user == null || education.getUniversity().trim().length() == 0)
            throw new UncorrectEntityException("education is null");
        education.setUser(user);
        education = educationRepository.save(education);
        return new EducationDto(education);
    }

    @Override
    public LanguageLevelDto createLanguageLevel(LanguageLevel languageLevel, User user) {
        if (languageLevel == null || user == null || languageLevel.getLanguage().trim().length() == 0 || languageLevel.getLanguage_level().trim().length() == 0)
            throw new UncorrectEntityException("languageLevel is null");
        languageLevel.setUser(user);
        languageLevel = languageLevelRepository.save(languageLevel);
        return new LanguageLevelDto(languageLevel);
    }

    @Override
    public WorkExperienceDto createWorkExperience(WorkExperience workEperience, User user) {
        if (workEperience == null || user == null || workEperience.getCompanyName().trim().length() == 0)
            throw new UncorrectEntityException("languageLevel is null");
        workEperience.setUser(user);
        workEperience = workExperienceRepository.save(workEperience);
        return new WorkExperienceDto(workEperience);
    }

    @Override
    public UserSkillDto createUserSkill(UserSkill userSkill, User user) {
        if (userSkill == null || user == null || userSkill.getSkill().trim().length() == 0) {
            throw new UncorrectEntityException("user skill is null");
        }
        userSkill.setUser(user);
        userSkill = userSkillRepository.save(userSkill);
        return new UserSkillDto(userSkill);
    }

    @Override
    public Boolean deleteEducation(String ids, User user) {
        Long id = Long.parseLong(ids);
        if (user == null || id == null) throw new UncorrectEntityException("failed to get education " + ids);
        Optional<Education> education = educationRepository.findById(id);

        if (!education.isPresent() || education.get().getUser().getId() != user.getId()) {
            throw new EntityNotFoundCustomException("No education with id " + id + " or user is not owner ");
        }

        educationRepository.delete(education.get());
        return true;
    }

    @Override
    public Boolean deleteLanguageLevel(String ids, User user) {
        Long id = Long.parseLong(ids);
        if (user == null || id == null) throw new UncorrectEntityException("failed to get language level " + ids);
        Optional<LanguageLevel> languageLevel = languageLevelRepository.findById(id);

        if (!languageLevel.isPresent() || languageLevel.get().getUser().getId() != user.getId()) {
            throw new EntityNotFoundCustomException("No language with id " + id + " or user is not owner ");
        }

        languageLevelRepository.delete(languageLevel.get());
        return true;
    }

    @Override
    public Boolean deleteWorkExperience(String ids, User user) {
        Long id = Long.parseLong(ids);
        if (user == null || id == null) throw new UncorrectEntityException("failed to get workExperience " + ids);
        Optional<WorkExperience> workEperience = workExperienceRepository.findById(id);
        if (!workEperience.isPresent() || workEperience.get().getUser().getId() != user.getId()) {
            throw new EntityNotFoundCustomException("No workExperience with id " + id + " or user is not owner ");
        }
        workExperienceRepository.delete(workEperience.get());
        return true;
    }

    @Override
    public Boolean deleteUserSkill(String ids, User user) {
        Long id = Long.parseLong(ids);
        if (user == null || id == null) throw new UncorrectEntityException("failed to get userSkill " + ids);
        Optional<UserSkill> userSkill = userSkillRepository.findById(id);
        if (!userSkill.isPresent() || userSkill.get().getUser().getId() != user.getId()) {
            throw new EntityNotFoundCustomException("No userSkill with id " + id + " or user is not owner ");
        }
        userSkillRepository.delete(userSkill.get());
        return true;
    }

    @Override
    public List<ProjectDto> getProjects(User user) {
        List<Project> projects = user.getOwnedMainProject();
        List<ProjectDto> projectDtos = Odt.convertLists(projects, item -> new ProjectDto(item));
        return projectDtos;
    }

    @Override
    public User findUserByUsername(String username) {
        return userRepository.findUserByUsername(username);
    }
}
