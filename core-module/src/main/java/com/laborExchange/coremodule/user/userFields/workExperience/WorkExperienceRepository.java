package com.laborExchange.coremodule.user.userFields.workExperience;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkExperienceRepository extends CrudRepository<WorkExperience, Long> {
}

