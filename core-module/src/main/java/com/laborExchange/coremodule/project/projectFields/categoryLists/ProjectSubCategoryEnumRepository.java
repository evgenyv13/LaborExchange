package com.laborExchange.coremodule.project.projectFields.categoryLists;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectSubCategoryEnumRepository extends CrudRepository<ProjectSubCategoryEnum, Long> {
}
