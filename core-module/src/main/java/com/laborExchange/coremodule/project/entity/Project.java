package com.laborExchange.coremodule.project.entity;

import com.laborExchange.coremodule.project.projectFields.ProjectSubCategory;
import com.laborExchange.coremodule.projectOwners.ProjectOwners;
import com.laborExchange.coremodule.tasks.entity.Tasks;
import com.laborExchange.coremodule.tokenSellsHistory.entity.TokenSellsHistory;
import com.laborExchange.coremodule.user.entity.User;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.sql.Timestamp;
import java.util.List;

@Entity
@Data
@Table(name = "projects")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @Size(max = 400)
    private String description;
    private String contacts;
    private Timestamp creatingDate;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "project") /*Token Transaction history where user buy*/
    private List<TokenSellsHistory> transactionsHistory;

    private float freezeToken;

    @Size(max = 30)
    private String linkedin;
    @Size(max = 60)
    private String gmail;
    @Size(max = 30)
    private String twitter;
    @Size(max = 30)
    private String github;
    @Size(max = 30)
    private String youtube;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_owner", nullable = false)
    private User projectOwner;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "project")
    private List<ProjectOwners> percentedOwnersProject;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "project")
    private List<Tasks> projectTasks;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "project")
    private List<ProjectSubCategory> projectSubCategories;

    @Override
    public String toString() {
        return "Project{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", contacts='" + contacts + '\'' +
                ", creatingDate=" + creatingDate +
                '}';
    }

}
