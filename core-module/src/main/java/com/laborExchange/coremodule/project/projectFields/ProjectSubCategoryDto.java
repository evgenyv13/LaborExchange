package com.laborExchange.coremodule.project.projectFields;

import lombok.Data;

@Data
public class ProjectSubCategoryDto {
    private Long id;
    private String subCategoryName;
    private Long subCategoryId;
    private String categoryName;
    private Long categoryId;

    public ProjectSubCategoryDto(ProjectSubCategory projectSubCategory) {
        this.id = projectSubCategory.getId();
        this.subCategoryName = projectSubCategory.getProjectSubCategoryEnum().getSubcategoryName();
        this.categoryName = projectSubCategory.getProjectSubCategoryEnum().getCategory().getCategoryName();
        this.subCategoryId = projectSubCategory.getId();
        this.categoryId = projectSubCategory.getProjectSubCategoryEnum().getCategory().getId();
    }
}
