package com.laborExchange.coremodule.project.service;

import com.laborExchange.coremodule.odt.Odt;
import com.laborExchange.coremodule.project.dto.ProjectDto;
import com.laborExchange.coremodule.project.entity.Project;
import com.laborExchange.coremodule.project.projectFields.ProjectSubCategory;
import com.laborExchange.coremodule.project.projectFields.ProjectSubCategoryControllerDto;
import com.laborExchange.coremodule.project.projectFields.ProjectSubCategoryDto;
import com.laborExchange.coremodule.project.projectFields.ProjectSubCategoryRepository;
import com.laborExchange.coremodule.project.projectFields.categoryLists.ProjectSubCategoryEnum;
import com.laborExchange.coremodule.project.projectFields.categoryLists.ProjectSubCategoryEnumRepository;
import com.laborExchange.coremodule.project.repository.ProjectRepository;
import com.laborExchange.coremodule.projectOwners.ProjectOwnersRepository;
import com.laborExchange.coremodule.user.dto.UserDto;
import com.laborExchange.coremodule.user.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Optional;

@Service
public class ProjectService {
    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private ProjectSubCategoryEnumRepository projectSubCategoryEnumRepository;
    @Autowired
    private ProjectSubCategoryRepository projectSubCategoryRepository;
    @Autowired
    private ProjectOwnersRepository projectOwnersRepository;

    private final int NUMBER_OF_PROJECTS_ON_PAGE = 8;



    public Page<Project> getProjectsByPage(int pageId) {
        return projectRepository.findAll(PageRequest.of(pageId - 1, NUMBER_OF_PROJECTS_ON_PAGE));
    }

    public Page<Project> getUserProjectsByPage(User user, int pageId) {
        return projectRepository.findAllByProjectOwner(user, PageRequest.of(pageId - 1, NUMBER_OF_PROJECTS_ON_PAGE));
    }

    public Project getProjectById(String projectId) {
        Long projectIdL = Long.parseLong(projectId);
        Optional<Project> project = projectRepository.findById(projectIdL);
        return project.get();
    }

    public ProjectDto getProjectDtoByProjectId(String projectId) {
        Long projectIdL = Long.parseLong(projectId);
        Optional<Project> project = projectRepository.findById(projectIdL);
        if (!project.isPresent()) return null;
        ProjectDto projectDto = new ProjectDto(project.get());
        projectDto.setProjectOwner(new UserDto(project.get().getProjectOwner()));
        return projectDto;
    }

    public Project createProject(Project project, User user) {
        if (project == null) return null;
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        project.setCreatingDate(timestamp);
        project.setProjectOwner(user);
        return projectRepository.save(project);
    }

    public Project updateProjectInfo(Project project, Project newProject) {
        if(newProject.getContacts()!=null) project.setContacts(newProject.getContacts());
        if(newProject.getDescription()!=null) project.setDescription(newProject.getDescription());
        if(newProject.getName()!=null) project.setName(newProject.getName());
        if(newProject.getLinkedin()!=null) project.setLinkedin(newProject.getLinkedin());
        if(newProject.getGithub()!=null) project.setGithub(newProject.getGithub());
        if(newProject.getGmail()!=null) project.setGmail(newProject.getGmail());
        if(newProject.getTwitter()!=null) project.setTwitter(newProject.getTwitter());
        if(newProject.getYoutube()!=null) project.setYoutube(newProject.getYoutube());
        return projectRepository.save(project);
    }

    public Page<Project> getPartnershipProjectsByPage(int pageId, User user) {
        return projectRepository.findPartnershipProjectsByUserAndPage(user.getId(), PageRequest.of(pageId - 1, NUMBER_OF_PROJECTS_ON_PAGE));
    }

    public ProjectSubCategoryDto addProjectSubCategory(ProjectSubCategoryControllerDto projectSubCategoryControllerDto,User user){
        Optional<Project> project = projectRepository.findById(projectSubCategoryControllerDto.getProjectId());
        Optional<ProjectSubCategoryEnum> projectSubCategoryEnum = projectSubCategoryEnumRepository.findById(projectSubCategoryControllerDto.getIdOfProjectSubCategory());

        if(!project.isPresent() || !projectSubCategoryEnum.isPresent() || user==null || project.get().getProjectOwner().getId()!=user.getId()) return null;

        ProjectSubCategory projectSubCategory = new ProjectSubCategory();
        projectSubCategory.setProject(project.get());
        projectSubCategory.setProjectSubCategoryEnum(projectSubCategoryEnum.get());

        ProjectSubCategory projectSubCategoryReturn = projectSubCategoryRepository.save(projectSubCategory);
        ProjectSubCategoryDto projectSubCategoryDto = new ProjectSubCategoryDto(projectSubCategoryReturn);

        return projectSubCategoryDto;
    }

    public Boolean deleteProjectSubCategory(String subCategoryId, User user) {
        Optional<ProjectSubCategory> projectSubCategory = projectSubCategoryRepository.findById(Long.valueOf(subCategoryId));
        if(!projectSubCategory.isPresent() || user==null || projectSubCategory.get().getProject().getProjectOwner().getId()!=user.getId()) return false;

        projectSubCategoryRepository.delete(projectSubCategory.get());
        return true;
    }
}
