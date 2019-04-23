package com.laborExchange.coremodule.tasksReply.service;

import com.laborExchange.coremodule.common.exception.AccessDeniedException;
import com.laborExchange.coremodule.common.exception.EntityNotFoundCustomException;
import com.laborExchange.coremodule.common.exception.UncorrectEntityException;
import com.laborExchange.coremodule.tasks.entity.Tasks;
import com.laborExchange.coremodule.tasks.repository.TaskRepository;
import com.laborExchange.coremodule.tasksReply.entity.TaskReply;
import com.laborExchange.coremodule.tasksReply.repository.TaskReplyRepository;
import com.laborExchange.coremodule.user.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Clock;
import java.time.LocalDateTime;

@Service
public class TaskReplyServiceImpl implements TaskReplyService {
    private final TaskReplyRepository taskReplyRepository;
    private final TaskRepository taskRepository;

    @Autowired
    public TaskReplyServiceImpl(TaskReplyRepository taskReplyRepository, TaskRepository taskRepository) {
        this.taskReplyRepository = taskReplyRepository;
        this.taskRepository = taskRepository;
    }

    @Override
    public TaskReply createNewTaskReply(TaskReply taskReply, User user) {

        TaskReply duplicatedTask = taskReplyRepository.findByUserAndTask(user, taskReply.getTask());

        if (duplicatedTask != null) {
            throw new UncorrectEntityException("you have already responded to this task");
        }

        taskReply.setUser(user);
        LocalDateTime localDateTime = LocalDateTime.now(Clock.systemUTC());
        Timestamp timestamp = Timestamp.valueOf(localDateTime);

        taskReply.setOrderDate(timestamp);
        return taskReplyRepository.save(taskReply);
    }

    @Override
    public TaskReply findTaskReplyById(String taskReplyId) {
        Long taskReplyIdLong = Long.parseLong(taskReplyId.trim());
        return taskReplyRepository.findById(taskReplyIdLong).orElseThrow(()->{ throw new EntityNotFoundCustomException("Task reply is not found , id = " + taskReplyId);   });
    }

    @Override
    public Page<TaskReply> getMyReplyingTasks(User user, Pageable pageable) {
        return taskReplyRepository.findByUser(user,pageable);
    }

    @Override
    public Page<TaskReply> findTaskReplysListByTaskId(Long userId, Long taskId, Pageable pageable) {
        Tasks task = taskRepository.findById(taskId).orElseThrow(()->{throw new EntityNotFoundCustomException("Task is not found , id = " + taskId);   });
        if(task.getProject().getProjectOwner().getId()!=userId){
            throw new AccessDeniedException("You should have owner privilege to view this");
        }
        return taskReplyRepository.findByTask(task,pageable);
    }
}
