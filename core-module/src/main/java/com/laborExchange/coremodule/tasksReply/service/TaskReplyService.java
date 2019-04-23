package com.laborExchange.coremodule.tasksReply.service;

import com.laborExchange.coremodule.tasksReply.entity.TaskReply;
import com.laborExchange.coremodule.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TaskReplyService {
    TaskReply createNewTaskReply(TaskReply taskReply, User user);

    TaskReply findTaskReplyById(String taskReplyId);

    Page<TaskReply> getMyReplyingTasks(User user, Pageable pageable);

    Page<TaskReply> findTaskReplysListByTaskId(Long userId, Long taskId, Pageable pageable);
}
