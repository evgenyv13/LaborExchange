package com.laborExchange.webmodule.controller;


import com.laborExchange.coremodule.project.dto.ProjectDto;
import com.laborExchange.coremodule.project.entity.Project;
import com.laborExchange.coremodule.project.projectFields.ProjectSubCategoryControllerDto;
import com.laborExchange.coremodule.project.projectFields.ProjectSubCategoryDto;
import com.laborExchange.coremodule.project.service.ProjectService;
import com.laborExchange.coremodule.user.entity.User;
import com.laborExchange.coremodule.user.service.UserService;
import com.laborExchange.webmodule.service.CommonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin
@RestController
@RequestMapping(value = "/api")
public class ProjectController {

    @Autowired
    ProjectService projectService;
    @Autowired
    CommonService commonService;
    @Autowired
    private UserService userService;

    @GetMapping(value = "/projects")
    public Object findProjects(@RequestParam(value = "page") int pageId) {
        Page<Project> projects = projectService.getProjectsByPage(pageId);
        return projects.map(project -> new ProjectDto(project));
    }

    @GetMapping(value = "/projects/{projectId}")
    public ProjectDto getCurrentProjectInfo(@PathVariable String projectId) {
        ProjectDto projectDto = projectService.getProjectDtoByProjectId(projectId);
        return projectDto;
    }

    @PostMapping(value = "/projects/createProject")
    public ProjectDto createProject(@Valid Project project) {
        User user = commonService.getCurrentUser();
        Project newProject = projectService.createProject(project, user);
        if (newProject == null) return null;
        else return new ProjectDto(newProject);
    }


    @PostMapping(value = "/projects/{projectId}/update")
    public ProjectDto updateProject(@PathVariable("projectId") String projectId, @Valid Project newProject, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) return null;
        Project project = projectService.getProjectById(projectId);
        if (project == null || newProject == null) return null;
        return new ProjectDto(projectService.updateProjectInfo(project, newProject));
    }

    /*use project id from url?*/
    @PostMapping(value = "/projects/{projectId}/addProjectSubCategory")
    public ProjectSubCategoryDto addProjectSubCategory(@PathVariable String projectId, @Valid ProjectSubCategoryControllerDto projectSubCategoryControllerDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) return null;
        User user = commonService.getCurrentUser();
        return projectService.addProjectSubCategory(projectSubCategoryControllerDto, user);
    }

    @DeleteMapping(value = "/projects/{projectId}/deleteProjectSubCategory")
    public Boolean deleteProjectSubCategory(@PathVariable String projectId, String subCategoryId) {
        User user = commonService.getCurrentUser();
        return projectService.deleteProjectSubCategory(subCategoryId, user);
    }

    /* returns - getOwnedMainProject */
/*  @Deprecated
    @RequestMapping(value = "/users/{userId}/projects", method = RequestMethod.GET)
    public List<ProjectDto> getUserProjects(@PathVariable("userId") String userId) {
        User user = userService.getUserById(userId);
        if (user == null) return null;
        return userService.getProjects(user);
    }
    */

    /*return by project owner all projects */
    /*   @GetMapping(value = "/myOwnedProjects")*/
    @GetMapping(value = "/users/myPage/ownedProjects")
    public Object getMyOwnedProjects(@RequestParam(value = "page") int pageId) {
        User user = commonService.getCurrentUser();
        Page<Project> projects = projectService.getUserProjectsByPage(user, pageId);

        return projects.map(project -> new ProjectDto(project));
    }

    @GetMapping(value = "/users/myPage/partnershipProjects")
    public Object getMyPartnershipProjects(@RequestParam(value = "page") int pageId) {
        User user = commonService.getCurrentUser();
        Page<Project> projects = projectService.getPartnershipProjectsByPage(pageId, user);
        return projects.map(ProjectDto::new);
    }

}
