package com.laborExchange.coremodule.tasks.repository;

import com.laborExchange.coremodule.project.entity.Project;
import com.laborExchange.coremodule.tasks.entity.Tasks;
import com.laborExchange.coremodule.user.entity.User;
import javafx.concurrent.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends CrudRepository<Tasks, Long> {
    Page<Tasks> findAll(Pageable pageable);

    Page<Tasks> findByUserAccepteedIsNull(Pageable pageable);

    Page<Tasks> findTasksByProjectAndUserAccepteedIsNull(Project project,Pageable pageable); // get opened tasks

    Page<Tasks> findTasksByProjectAndUserAccepteedIsNotNullAndDoneIsFalse(Project project,Pageable pageable); // get processed tasks

    Page<Tasks> findTasksByProjectAndUserAccepteedIsNotNullAndDoneIsTrue(Project project,Pageable pageable); // get closed tasks
}