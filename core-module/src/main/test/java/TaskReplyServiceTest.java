/*
package java;


import com.laborExchange.coremodule.tasksReply.entity.TaskReply;
import com.laborExchange.coremodule.tasksReply.service.TaskReplyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.junit.Test;

import static org.junit.Assert.*;

public class TaskReplyServiceTest {

    @Autowired
    private TaskReplyService service;

    @Test
    public void findTaskReplyById() {

        final String errorMessage = "Incorrect task reply was find";
        final String firstTaskReplyDescription = "this task is not so easy, I want more";

        TaskReply findedTaskReply = service.findTaskReplyById("1");
        assertEquals(errorMessage, findedTaskReply.getDescription(), firstTaskReplyDescription);
    }
}
*/
