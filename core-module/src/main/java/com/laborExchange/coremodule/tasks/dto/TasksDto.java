package com.laborExchange.coremodule.tasks.dto;

import com.laborExchange.coremodule.project.dto.ProjectDto;
import com.laborExchange.coremodule.tasks.entity.Tasks;
import com.laborExchange.coremodule.tasksReply.dto.TaskReplyDto;
import com.laborExchange.coremodule.user.dto.UserDto;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class TasksDto {
    private Long id;
    private String name;
    private String description;
    private Integer progress;
    private float paymentPercent;
    private String category;
    private String skills;
    private LocalDateTime creatingDate = null;
    private Boolean done;

    private ProjectDto project;
    private UserDto userAccepteed;
    private List<TaskReplyDto> replyingTasks;

    public TasksDto(Tasks tasks) {
        this.id = tasks.getId();
        this.name = tasks.getName();
        this.description = tasks.getDescription();
        this.progress = tasks.getProgress();
        this.paymentPercent = tasks.getPaymentPercent();
        this.category = tasks.getCategory();
        this.skills = tasks.getSkills();
        this.done=tasks.getDone();
        if (tasks.getCreatingDate() != null) this.creatingDate = tasks.getCreatingDate().toLocalDateTime();

    }
}
