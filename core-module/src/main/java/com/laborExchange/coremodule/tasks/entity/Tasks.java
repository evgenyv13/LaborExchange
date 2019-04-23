package com.laborExchange.coremodule.tasks.entity;

import com.laborExchange.coremodule.project.entity.Project;
import com.laborExchange.coremodule.tasksReply.entity.TaskReply;
import com.laborExchange.coremodule.user.entity.User;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.sql.Timestamp;
import java.util.List;

@Entity
@Data
@Table(name = "tasks")
public class Tasks {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Size(max = 60)
    private String name;
    @Size(max = 400)
    private String description;
    private Integer progress;
    private float paymentPercent;
    @Size(max = 45)
    private String category;
    @Size(max = 45)
    private String skills;
    private Timestamp creatingDate;
    private Boolean done;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_accepteed_id", columnDefinition = "INT UNSIGNED IS NULL", nullable = true)
    private User userAccepteed;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "task")
    private List<TaskReply> replyingTasks;


    /*    private java.sql.Date creatingDate;*/


    @Override
    public String toString() {
        return "Tasks{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", progress=" + progress +
                ", paymentPercent=" + paymentPercent +
                ", category='" + category + '\'' +
                ", skills='" + skills + '\'' +
                '}';
    }
}
