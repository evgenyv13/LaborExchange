package com.laborExchange.coremodule.projectOwners;

import com.laborExchange.coremodule.project.entity.Project;
import com.laborExchange.coremodule.projectOwners.dto.ProjectsInTradeListItemDto;
import com.laborExchange.coremodule.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectOwnersRepository extends CrudRepository<ProjectOwners, Long> {

    ProjectOwners findByUserAndProject(User user, Project project);

    @Query(
            value = "SELECT NEW com.laborExchange.coremodule.projectOwners.dto.ProjectsInTradeListItemDto(p.project, count(p.user)) FROM ProjectOwners p WHERE p.freeToSellToken > 0" +
                    " GROUP BY p.project")
    Page<ProjectsInTradeListItemDto> findAllProjectsInTradeByPage(Pageable pageable);

    @EntityGraph(attributePaths = "project")
    Page<ProjectOwners> findByUser(User user, Pageable pageable);

    @EntityGraph(attributePaths = "user")
    Page<ProjectOwners> findByProjectAndFreeToSellTokenIsGreaterThanOrderByFreeToSellPerTokenPrice(Project project, Float nullValue, Pageable pageable);

    /*This method used only project owner , it returns full information about Owned of project*/
    @EntityGraph(attributePaths = "user")
    Page<ProjectOwners> findByProject(Project project, Pageable pageable);

}
