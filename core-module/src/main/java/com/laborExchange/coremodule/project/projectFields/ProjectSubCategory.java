package com.laborExchange.coremodule.project.projectFields;

import com.laborExchange.coremodule.project.entity.Project;
import com.laborExchange.coremodule.project.projectFields.categoryLists.ProjectSubCategoryEnum;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "project_subcategories")
public class ProjectSubCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "subcategory_id", nullable = false)
    private ProjectSubCategoryEnum projectSubCategoryEnum;
}
