package com.laborExchange.webmodule.controller;

import com.laborExchange.coremodule.project.dto.ProjectDto;
import com.laborExchange.coremodule.project.entity.Project;
import com.laborExchange.coremodule.project.projectFields.ProjectSubCategoryDto;
import com.laborExchange.coremodule.project.service.ProjectService;
import com.laborExchange.coremodule.projectOwners.ProjectOwnersDto;
import com.laborExchange.coremodule.user.entity.User;
import com.laborExchange.webmodule.service.CommonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping(value = "/api")
public class ProjectController {

    @Autowired
    ProjectService projectService;
    @Autowired
    CommonService commonService;

    /**
     * @param *UrlParam page=1&size=1
     * page - page num ,size - ammount of elements in one page
     * @return
     */
    @GetMapping(value = "/projects")
    public Object findProjects(Pageable pageable) {
        Page<Project> projects = projectService.findAllProjectsByPageLoadSubCategories(pageable);
        return projects.map(ProjectDto::new);
    }

    @GetMapping(value = "/projects/{projectId}")
    public ProjectDto getProjectInfoByProjectId(@PathVariable String projectId) {
        return projectService.getProjectDtoByProjectId(projectId);
    }

    /**
     * @param *FormData , mandatory should contain name
     * @return ProjectDto or exception
     */
    @PostMapping(value = "/projects/createProject")
    public Object createProject(Project project) {
        User user = commonService.getCurrentUser();
        Project newProject = projectService.createProject(project, user);

        return ResponseEntity.status(201).body(new ProjectDto(newProject));
    }

    /**
     * @param *Form data - type - Project / id is not needed
     * @return Updated ProjectDto or  exception
     */
    @PostMapping(value = "/projects/{projectId}/update")
    public Object updateProjectById(@PathVariable("projectId") Long projectId, Project newProject) {
        Long currentUserId = commonService.getCurrentUserId();
        ProjectDto responseDto = new ProjectDto(projectService.updateProjectInfo(projectId, newProject, currentUserId));

        return ResponseEntity.ok().body(responseDto);
    }

    /**
     * @param *raw projectSubCatId
     * @return SubCatDto or exception
     */
    @PostMapping(value = "/projects/{projectId}/addProjectSubCategory")
    public ProjectSubCategoryDto addProjectSubCategory(@PathVariable Long projectId, @RequestBody Long projectSubCategoryId) {
        Long userId = commonService.getCurrentUserId();
        return projectService.addProjectSubCategory(projectId, projectSubCategoryId, userId);
    }

    /**
     * @param *raw Long - subCategoryId
     * @return true or exception
     */
    @DeleteMapping(value = "/projects/{projectId}/deleteProjectSubCategory")
    public Boolean deleteProjectSubCategory(@PathVariable Long projectId, @RequestBody Long subCategoryId) {
        Long userId = commonService.getCurrentUserId();
        return projectService.deleteProjectSubCategory(projectId, subCategoryId, userId);
    }


    /**
     * @param projectId mandatory,
     *                  not mandatory : page , size
     * @return Page<ProjectOwnersDto>
     */
    @GetMapping(value = "/projects/{projectId}/getProjectPartners")
    public Page<ProjectOwnersDto> getProjectPartners(@PathVariable("projectId") long projectId, Pageable pageable) {
        Long userId = commonService.getCurrentUserId();
        return projectService.getProjectPartnersList(projectId,userId,pageable);
    }

}
