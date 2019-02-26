package com.laborExchange.coremodule.project.projectFields.categoryLists;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.List;

@Entity
@Data
@Table(name = "project_category_list")
public class ProjectCategoryEnum {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Size(max = 20)
    private String categoryName;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "category")
    private List<ProjectSubCategoryEnum> subCategorys;
}
