package com.laborExchange.coremodule.project.repository;

import com.laborExchange.coremodule.project.entity.Project;
import com.laborExchange.coremodule.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends CrudRepository<Project, Long> {

    Page<Project> findAll(Pageable pageable);

    Page<Project> findAllByProjectOwner(User user, Pageable pageable);

    @Query(value = "SELECT * FROM projects INNER JOIN project_owners po ON projects.id = po.project_id WHERE po.user_id=:companyId \n-- #pageable\n", nativeQuery = true)
    Page<Project> findPartnershipProjectsByUserAndPage(@Param("companyId") Long companyId, Pageable pageable);


}
