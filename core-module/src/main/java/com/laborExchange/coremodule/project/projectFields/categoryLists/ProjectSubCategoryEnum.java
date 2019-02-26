package com.laborExchange.coremodule.project.projectFields.categoryLists;


import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Entity
@Data
@Table(name = "project_subcategory_list")
public class ProjectSubCategoryEnum {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Size(max = 20)
    private String subcategoryName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private ProjectCategoryEnum category;
}
