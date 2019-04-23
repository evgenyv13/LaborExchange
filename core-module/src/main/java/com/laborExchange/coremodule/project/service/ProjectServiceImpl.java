package com.laborExchange.coremodule.project.service;

import com.laborExchange.coremodule.common.exception.AccessDeniedException;
import com.laborExchange.coremodule.common.exception.EntityNotFoundCustomException;
import com.laborExchange.coremodule.common.exception.UncorrectEntityException;
import com.laborExchange.coremodule.project.dto.ProjectDto;
import com.laborExchange.coremodule.project.entity.Project;
import com.laborExchange.coremodule.project.projectFields.ProjectSubCategory;
import com.laborExchange.coremodule.project.projectFields.ProjectSubCategoryDto;
import com.laborExchange.coremodule.project.projectFields.ProjectSubCategoryRepository;
import com.laborExchange.coremodule.project.projectFields.categoryLists.ProjectSubCategoryEnum;
import com.laborExchange.coremodule.project.projectFields.categoryLists.ProjectSubCategoryEnumRepository;
import com.laborExchange.coremodule.project.repository.ProjectRepository;
import com.laborExchange.coremodule.projectOwners.ProjectOwners;
import com.laborExchange.coremodule.projectOwners.ProjectOwnersDto;
import com.laborExchange.coremodule.projectOwners.ProjectOwnersRepository;
import com.laborExchange.coremodule.projectOwners.dto.ProjectOwnersMinimalDto;
import com.laborExchange.coremodule.user.dto.UserDto;
import com.laborExchange.coremodule.user.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.sql.Timestamp;

@Service
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;
    private final ProjectSubCategoryEnumRepository projectSubCategoryEnumRepository;
    private final ProjectSubCategoryRepository projectSubCategoryRepository;
    private final ProjectOwnersRepository projectOwnersRepository;


    @Autowired
    public ProjectServiceImpl(ProjectRepository projectRepository, ProjectSubCategoryEnumRepository projectSubCategoryEnumRepository, ProjectSubCategoryRepository projectSubCategoryRepository, ProjectOwnersRepository projectOwnersRepository) {
        this.projectRepository = projectRepository;
        this.projectSubCategoryEnumRepository = projectSubCategoryEnumRepository;
        this.projectSubCategoryRepository = projectSubCategoryRepository;
        this.projectOwnersRepository = projectOwnersRepository;
    }

    @Override
    public Page<Project> getUserProjectsByPage(User user, Pageable pageable) {
        return projectRepository.findAllByProjectOwner(user, pageable);
    }

    @Override
    public Project findById(Long projectId) {
        return projectRepository.findById(projectId).orElseThrow(() -> new EntityNotFoundCustomException("Project with Id " + projectId + " not found"));
    }

    @Override
    public Project getProjectById(String projectId) {
        Long projectIdL = Long.parseLong(projectId);
        return projectRepository.findById(projectIdL).orElseThrow(() -> new EntityNotFoundCustomException("Project with Id " + projectId + " not found"));
    }

    @Override
    public ProjectDto getProjectDtoByProjectId(String projectId) {
        Long projectIdL = Long.parseLong(projectId);
        Project project = projectRepository.findById(projectIdL).orElseThrow(() -> new EntityNotFoundCustomException("No project with id " + projectId));

        ProjectDto projectDto = new ProjectDto(project);
        projectDto.setProjectOwner(new UserDto(project.getProjectOwner()));

        return projectDto;
    }

    @Override
    @Transactional
    public Project createProject(Project project, User user) {
        if (project == null) throw new UncorrectEntityException("Uncorrected project entity");

        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        project.setCreatingDate(timestamp);
        project.setProjectOwner(user);

        Project savedProject = projectRepository.save(project);

        ProjectOwners projectOwners = new ProjectOwners(user, 100, savedProject);
        projectOwnersRepository.save(projectOwners);

        return projectRepository.save(project);
    }

    @Override
    public Project updateProjectInfo(Long projectId, Project newProject, Long currentUserId) {

        Project project = projectRepository.findById(projectId).orElseThrow(() -> new EntityNotFoundCustomException("Project not  found , id = " + projectId));

        if (project.getProjectOwner().getId() != currentUserId) {
            throw new AccessDeniedException("User is not the owner of the project");
        }

        if (newProject.getContacts() != null) project.setContacts(newProject.getContacts());
        if (newProject.getDescription() != null) project.setDescription(newProject.getDescription());
        if (newProject.getName() != null) project.setName(newProject.getName());
        if (newProject.getLinkedin() != null) project.setLinkedin(newProject.getLinkedin());
        if (newProject.getGithub() != null) project.setGithub(newProject.getGithub());
        if (newProject.getGmail() != null) project.setGmail(newProject.getGmail());
        if (newProject.getTwitter() != null) project.setTwitter(newProject.getTwitter());
        if (newProject.getYoutube() != null) project.setYoutube(newProject.getYoutube());

        return projectRepository.save(project);
    }

    @Override
    public Page<Project> getPartnershipProjectsByPage(Pageable pageable, User user) {
        return projectRepository.findPartnershipProjectsByUserAndPage(user.getId(), pageable);
    }

    @Override
    public ProjectSubCategoryDto addProjectSubCategory(Long projectId, Long projectSubCategoryId, Long userId) {

        Project project = projectRepository.findById(projectId).orElseThrow(() -> new EntityNotFoundCustomException("Project with id " + projectId + " not found "));

        ProjectSubCategoryEnum projectSubCategoryEnum = projectSubCategoryEnumRepository.findById(projectSubCategoryId).orElseThrow(() -> new EntityNotFoundCustomException("SubCategory with id " + projectSubCategoryId + " not found "));

        if (!project.getProjectOwner().getId().equals(userId)) {
            throw new AccessDeniedException("Current user is not project owner");
        }

        ProjectSubCategory projectSubCategory = new ProjectSubCategory();
        projectSubCategory.setProject(project);
        projectSubCategory.setProjectSubCategoryEnum(projectSubCategoryEnum);

        ProjectSubCategory projectSubCategoryReturn = projectSubCategoryRepository.save(projectSubCategory);

        return new ProjectSubCategoryDto(projectSubCategoryReturn);
    }

    @Override
    public Boolean deleteProjectSubCategory(Long projectId, Long subCategoryId, Long userId) {
        ProjectSubCategory projectSubCategory = projectSubCategoryRepository.findById(subCategoryId).orElseThrow(() -> new EntityNotFoundCustomException("Project sub category with id " + subCategoryId + " is not found "));
        if (!projectSubCategory.getProject().getId().equals(projectId)) {
            throw new UncorrectEntityException("Sub category project id is not equals project id ");
        }
        if (!projectSubCategory.getProject().getProjectOwner().getId().equals(userId)) {
            throw new AccessDeniedException("User is not project owner");
        }

        projectSubCategoryRepository.delete(projectSubCategory);
        return true;
    }

    @Override
    @Transactional
    public ProjectOwners putUpTokensForSale(Project project, User user, float percents) {

        ProjectOwners projectOwners = projectOwnersRepository.findByUserAndProject(user, project);

        if (projectOwners == null) {
            throw new EntityNotFoundCustomException("You have not got tokens of this project");
        }
        if (projectOwners.getPercent() < percents) {
            throw new UncorrectEntityException("You have not got so many tokens ( " + percents + " ) ");
        }

        projectOwners.setPercent(projectOwners.getPercent() - percents);
        projectOwners.setFreeToSellToken(projectOwners.getFreeToSellToken() + percents);
        return projectOwners;
    }

    @Override
    @Transactional
    public ProjectOwners getUpTokensFromSale(Project project, User user, float percents) {
        ProjectOwners projectOwners = projectOwnersRepository.findByUserAndProject(user, project);
        if (projectOwners == null) {
            throw new EntityNotFoundCustomException("You have not  got tokens of this project");
        }

        if (projectOwners.getFreeToSellToken() >= percents) {
            projectOwners.setFreeToSellToken(projectOwners.getFreeToSellToken() - percents);
            projectOwners.setPercent(projectOwners.getPercent() + percents);
            return projectOwners;
        }
        else {
            throw new UncorrectEntityException("You have not  got so much tokens of this project");
        }
    }

    @Override
    @Transactional
    public ProjectOwners setTokenPrice(Project project, User user, float tokenPrice) {
        ProjectOwners projectOwners = projectOwnersRepository.findByUserAndProject(user, project);
        if (projectOwners == null){
            throw new EntityNotFoundCustomException("You have not  got tokens of this project");
        }
        projectOwners.setFreeToSellPerTokenPrice(tokenPrice);

        return projectOwners;
    }

    @Override
    @Transactional
    public Page<ProjectOwnersMinimalDto> getTokenSellsByProject(Project project, Pageable pageable) {
        Page<ProjectOwners> projectOwners = projectOwnersRepository.findByProjectAndFreeToSellTokenIsGreaterThanOrderByFreeToSellPerTokenPrice(project,0f,pageable);
        return projectOwners.map(ProjectOwnersMinimalDto::new);
    }

    @Override
    public Page<Project> findAllProjectsByPageLoadSubCategories(Pageable pageable) {
        return projectRepository.findAll(pageable);
    }

    @Override
    public Page<ProjectOwnersDto> getProjectPartnersList(Long projectId, Long userId, Pageable pageable) {
        Project project = findById(projectId);

        if (!project.getProjectOwner().getId().equals(userId)) {
            throw new AccessDeniedException("Current user is not owner");
        }

        return projectOwnersRepository.findByProject(project, pageable).map(ProjectOwnersDto::new);
    }
}