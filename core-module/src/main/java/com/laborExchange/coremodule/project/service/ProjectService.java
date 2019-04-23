package com.laborExchange.coremodule.project.service;

import com.laborExchange.coremodule.project.dto.ProjectDto;
import com.laborExchange.coremodule.project.entity.Project;
import com.laborExchange.coremodule.project.projectFields.ProjectSubCategoryDto;
import com.laborExchange.coremodule.projectOwners.ProjectOwners;
import com.laborExchange.coremodule.projectOwners.ProjectOwnersDto;
import com.laborExchange.coremodule.projectOwners.dto.ProjectOwnersMinimalDto;
import com.laborExchange.coremodule.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import javax.transaction.Transactional;

public interface ProjectService {
    Page<Project> getUserProjectsByPage(User user, Pageable pageable);

    Project findById(Long projectId);

    Project getProjectById(String projectId);

    ProjectDto getProjectDtoByProjectId(String projectId);

    @Transactional
    Project createProject(Project project, User user);

    Project updateProjectInfo(Long project, Project newProject, Long currentUserId);

    Page<Project> getPartnershipProjectsByPage(Pageable pageable, User user);

    ProjectSubCategoryDto addProjectSubCategory(Long projectId, Long projectSubCategoryId, Long userId);

    Boolean deleteProjectSubCategory(Long projectId, Long subCategoryId, Long user);

    @Transactional
    ProjectOwners putUpTokensForSale(Project project, User user, float percents);

    @Transactional
    ProjectOwners getUpTokensFromSale(Project project, User user, float percents);

    @Transactional
    ProjectOwners setTokenPrice(Project project, User user, float tokenPrice);

    @Transactional
    Page<ProjectOwnersMinimalDto> getTokenSellsByProject(Project project, Pageable pageable);

    Page<Project> findAllProjectsByPageLoadSubCategories(Pageable pageable);

    Page<ProjectOwnersDto> getProjectPartnersList(Long projectId, Long userId, Pageable pageable);
}
