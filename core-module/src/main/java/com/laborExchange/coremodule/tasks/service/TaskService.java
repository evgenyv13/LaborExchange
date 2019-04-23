package com.laborExchange.coremodule.tasks.service;

import com.laborExchange.coremodule.tasks.dto.TasksDto;
import com.laborExchange.coremodule.tasks.entity.Tasks;

import com.laborExchange.coremodule.tasksReply.entity.TaskReply;
import com.laborExchange.coremodule.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import javax.transaction.Transactional;

public interface TaskService {
    Page<Tasks> getTasksByPage(Pageable pageable);

    TasksDto markTaskAsDone(String taskId, Long requiredUser);

    TasksDto findTaskById(String id, Long requestingUser);

    Tasks acceptUserToDoTaskByTaskReply(User requsetUser, TaskReply taskReply);

    @Transactional
    Tasks createTaskInProject(Tasks task, User user, String projectId);

    Page<TasksDto> getOpenTasks(Pageable pageId, String projectIdString);

    Page<TasksDto> getRunningTasks(Long projectId, Long userId, Pageable pageable);

    Page<TasksDto> getClosedTasks(Long projectId, Long userId, Pageable pageable);

    Page<Tasks> getUserActiveTasks(User user, Pageable pageable);
}
