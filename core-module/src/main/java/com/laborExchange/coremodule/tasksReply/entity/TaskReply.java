package com.laborExchange.coremodule.tasksReply.entity;

import com.laborExchange.coremodule.tasks.entity.Tasks;
import com.laborExchange.coremodule.user.entity.User;
import lombok.Data;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Data
@Table(name = "tasks_reply")
public class TaskReply {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "task_id")
    private Tasks task;

    private Timestamp orderDate;
    private float wantedPercent;
    private String description;

    @Override
    public String toString() {
        return "TaskReply{" +
                "id=" + id +
                ", orderDate=" + orderDate +
                ", wantedPercent=" + wantedPercent +
                ", description='" + description + '\'' +
                '}';
    }
}
