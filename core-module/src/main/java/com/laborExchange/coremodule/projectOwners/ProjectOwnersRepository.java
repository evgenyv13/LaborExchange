package com.laborExchange.coremodule.projectOwners;

import com.laborExchange.coremodule.project.entity.Project;
import com.laborExchange.coremodule.user.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectOwnersRepository extends CrudRepository<ProjectOwners, Long> {
    public ProjectOwners findByUserAndProject(User user, Project project);
}
