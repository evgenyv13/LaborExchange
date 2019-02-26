package com.laborExchange.coremodule.projectOwners;

import com.laborExchange.coremodule.project.entity.Project;
import com.laborExchange.coremodule.tasks.entity.Tasks;
import com.laborExchange.coremodule.user.entity.User;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "project_owners")
public class ProjectOwners {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    private float percent;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "project_id")
    private Project project;
}
