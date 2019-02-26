package com.laborExchange.coremodule.user.userFields.education;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EducationRepository extends CrudRepository<Education, Long> {
}
