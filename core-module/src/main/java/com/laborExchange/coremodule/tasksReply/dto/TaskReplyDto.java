package com.laborExchange.coremodule.tasksReply.dto;

import com.laborExchange.coremodule.tasks.dto.TasksDto;
import com.laborExchange.coremodule.tasksReply.entity.TaskReply;
import com.laborExchange.coremodule.user.dto.UserDto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TaskReplyDto {
    private Long id;
    private LocalDateTime orderDate;
    private float wantedPercent;
    private String description;

    private UserDto user;
    private TasksDto task;

    public TaskReplyDto(TaskReply taskReply) {
        this.id = taskReply.getId();
        this.wantedPercent = taskReply.getWantedPercent();
        this.description = taskReply.getDescription();
        if (taskReply.getUser() != null) this.user = new UserDto(taskReply.getUser());
        if (taskReply.getOrderDate() != null) this.orderDate = taskReply.getOrderDate().toLocalDateTime();
    }
}
