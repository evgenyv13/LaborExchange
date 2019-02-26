package com.laborExchange.coremodule.project.projectFields;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectSubCategoryRepository extends CrudRepository<ProjectSubCategory, Long>{
}