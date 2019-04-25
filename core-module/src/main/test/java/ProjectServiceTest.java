/*
package java;


import com.laborExchange.coremodule.project.dto.ProjectDto;
import com.laborExchange.coremodule.project.entity.Project;
import com.laborExchange.coremodule.project.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.junit.Test;

import static org.junit.Assert.*;

public class ProjectServiceTest {

    @Autowired
    private ProjectService service;

    @Test
    public void findById() {

        final String errorMessage = "Incorrect project was find";
        final String firstProjectName = "Check the weather";

        Project findedProject = service.findById(1L);
        assertEquals(errorMessage, findedProject.getName(), firstProjectName);
    }

    @Test
    public void getProjectDtoByProjectId(){

        final String errorMessage = "Incorrect project dto was find";
        final String firstProjectName = "Check the weather";

        ProjectDto dto = service.getProjectDtoByProjectId("1");
        assertEquals(errorMessage, dto.getName(), firstProjectName);
    }
}
*/
