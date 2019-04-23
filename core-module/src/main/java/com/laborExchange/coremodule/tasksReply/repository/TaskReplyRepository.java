package com.laborExchange.coremodule.tasksReply.repository;

import com.laborExchange.coremodule.tasks.entity.Tasks;
import com.laborExchange.coremodule.tasksReply.entity.TaskReply;
import com.laborExchange.coremodule.user.entity.User;
import org.hibernate.annotations.BatchSize;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.repository.CrudRepository;


public interface TaskReplyRepository extends CrudRepository<TaskReply, Long> {
    TaskReply findByUserAndTask(User user, Tasks tasks);

    Page<TaskReply> findByUser(User user, Pageable pageable);

    @EntityGraph(attributePaths = "user")
    @BatchSize(size = 20)
    Page<TaskReply> findByTask(Tasks tasks, Pageable pageable);

}
