package com.laborExchange.coremodule.user.userFields.userSkill;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserSkillRepository extends CrudRepository<UserSkill, Long> {
}
