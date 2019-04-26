package java;

import com.laborExchange.coremodule.tasks.dto.TasksDto;
import com.laborExchange.coremodule.tasks.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.junit.Test;

import static org.junit.Assert.*;

public class TaskServiceTest {

    @Autowired
    private TaskService service;

    @Test
    public void findTaskById() {

        final String errorMessage = "Incorrect task was find";
        final String firstTaskDescription = "need to deploy server with jenkins";

        TasksDto findedTask = service.findTaskById("1", 1L);
        assertEquals(errorMessage, findedTask.getDescription(), firstTaskDescription);
    }
}
