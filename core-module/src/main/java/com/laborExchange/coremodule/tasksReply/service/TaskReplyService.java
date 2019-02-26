package com.laborExchange.coremodule.tasksReply.service;

import com.laborExchange.coremodule.tasksReply.entity.TaskReply;
import com.laborExchange.coremodule.tasksReply.repository.TaskReplyRepository;
import com.laborExchange.coremodule.user.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Clock;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class TaskReplyService {
    @Autowired
    private TaskReplyRepository taskReplyRepository;

    public TaskReply createNewTaskReply(TaskReply taskReply, User user) {
        if (taskReply.getTask() == null) return null;
        taskReply.setUser(user);
        LocalDateTime localDateTime = LocalDateTime.now(Clock.systemUTC());
        Timestamp timestamp = Timestamp.valueOf(localDateTime);

        taskReply.setOrderDate(timestamp);
        return taskReplyRepository.save(taskReply);
    }

    public TaskReply findTaskReplyById(String taskReplyId) {
        Long taskReplyIdLong = Long.parseLong(taskReplyId.trim());
        if (taskReplyIdLong == null) return null;
        return taskReplyRepository.findById(taskReplyIdLong).get();
    }
}
