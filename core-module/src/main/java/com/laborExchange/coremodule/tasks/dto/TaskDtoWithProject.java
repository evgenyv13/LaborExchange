package com.laborExchange.coremodule.tasks.dto;

import com.laborExchange.coremodule.project.dto.ProjectMinimalDto;
import com.laborExchange.coremodule.tasks.entity.Tasks;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TaskDtoWithProject {
    private Long id;
    private String name;
    private String description;
    private Integer progress;
    private float paymentPercent;
    private String category;
    private String skills;
    private LocalDateTime creatingDate = null;
    private Boolean done;

    private ProjectMinimalDto project;

    public TaskDtoWithProject(Tasks tasks) {
        this.id = tasks.getId();
        this.name = tasks.getName();
        this.description = tasks.getDescription();
        this.progress = tasks.getProgress();
        this.paymentPercent = tasks.getPaymentPercent();
        this.category = tasks.getCategory();
        this.skills = tasks.getSkills();
        this.done=tasks.getDone();
        if (tasks.getCreatingDate() != null) this.creatingDate = tasks.getCreatingDate().toLocalDateTime();
        this.project = new ProjectMinimalDto(tasks.getProject());

    }
}
