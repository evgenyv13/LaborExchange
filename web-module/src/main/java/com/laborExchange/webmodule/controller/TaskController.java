package com.laborExchange.webmodule.controller;

import com.laborExchange.coremodule.tasks.dto.TaskDtoWithProject;
import com.laborExchange.coremodule.tasks.dto.TasksDto;
import com.laborExchange.coremodule.tasks.entity.Tasks;
import com.laborExchange.coremodule.tasks.service.TaskService;
import com.laborExchange.coremodule.tasksReply.dto.TaskReplyDto;
import com.laborExchange.coremodule.tasksReply.entity.TaskReply;
import com.laborExchange.coremodule.tasksReply.service.TaskReplyService;
import com.laborExchange.coremodule.user.entity.User;
import com.laborExchange.webmodule.service.CommonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


@PreAuthorize("hasAuthority('ROLE_USER')")
@CrossOrigin
@RestController
@RequestMapping(value = "/api")
public class TaskController {

    @Autowired
    private CommonService commonService;
    @Autowired
    private TaskService taskService;
    @Autowired
    private TaskReplyService taskReplyService;



    @GetMapping(value = "/tasks")
    public Page<TaskDtoWithProject> getAllTasks(Pageable pageable) {
        Page<Tasks> tasks = taskService.getTasksByPage(pageable);
        return tasks.map(TaskDtoWithProject::new);
    }

    @GetMapping(value = "/users/myPage/taskReplys")
    public Page<TaskReplyDto> getMyTaskReplys(Pageable pageable) {
        User user = commonService.getCurrentUser();
        Page<TaskReply> taskReplies = taskReplyService.getMyReplyingTasks(user,pageable);
        return taskReplies.map(TaskReplyDto::new);
    }

    @GetMapping(value = "/users/myPage/getMyTasks")
    public Page<TaskDtoWithProject> getMyTasks(Pageable pageable) {
        User user = commonService.getCurrentUser();

        Page<Tasks> tasks = taskService.getUserActiveTasks(user,pageable);
        return tasks.map(TaskDtoWithProject::new);
    }

    @GetMapping(value = "/projects/allProjects/tasks/{taskId}")
    public TasksDto getTaskById(@PathVariable String taskId) {
        Long userId = commonService.getCurrentUserId();
        return taskService.findTaskById(taskId, userId);
    }

    @GetMapping(value = "/projects/{projectId}/tasks/tasksOpened")
    public Page<TasksDto> getOpenTasks(@PathVariable String projectId,Pageable pageable) {
        return taskService.getOpenTasks(pageable,projectId);
    }


    @GetMapping(value = "/projects/{projectId}/tasks/tasksRunning")
    public Page<TasksDto> getRunningTasks(@PathVariable String projectId,Pageable pageable) {
        Long userId = commonService.getCurrentUserId();
        return taskService.getRunningTasks(Long.parseLong(projectId),userId,pageable);
    }

    @GetMapping(value = "/projects/{projectId}/tasks/tasksClosed")
    public Page<TasksDto> getClosedTasks(@PathVariable String projectId,Pageable pageable) {
        Long userId = commonService.getCurrentUserId();
        return taskService.getClosedTasks(Long.parseLong(projectId),userId,pageable);
    }

    /**
     * Use FormData
     * name:testName
     * paymentPercent:123
     */
    @PostMapping(value = "/projects/{projectId}/tasks/newTask")
    public TasksDto createNewTask(@PathVariable String projectId, @ModelAttribute Tasks tasks) {
        User user = commonService.getCurrentUser();
        Tasks task = taskService.createTaskInProject(tasks, user, projectId);
        return new TasksDto(task);
    }

    @GetMapping(value = "/projects/{projectId}/tasks/{taskId}/taskReplays")
    public Page<TaskReplyDto> getTasksReplys(@PathVariable("projectId") String projectId,@PathVariable("taskId") String taskId,Pageable pageable) {
        Long userId = commonService.getCurrentUserId();
        Page<TaskReplyDto> taskReplyDtoPage = taskReplyService.findTaskReplysListByTaskId(userId , Long.parseLong(taskId),pageable).map(TaskReplyDto::new);
        return taskReplyDtoPage;
    }

    /**
     * @param projectId
     * @param taskReplyId( Raw format )
     * @return Tasks / Exception
     */
    @PutMapping(value = "/projects/{projectId}/tasks/acceptTaskReply")
    public Object acceptUserByTaskReply(@PathVariable String projectId,@RequestBody String taskReplyId) {
        User user = commonService.getCurrentUser();
        TaskReply taskReply = taskReplyService.findTaskReplyById(taskReplyId);

        Tasks task = taskService.acceptUserToDoTaskByTaskReply(user, taskReply);
        return new TasksDto(task);
    }

    /**
     * @param *FormData* required row - task[int]
     * you may add description(string 45), wantedPercent( float )
     * @return TaskReplyDto
     */
    @PostMapping(value = "/projects/{projectId}/tasks/newTaskReply")
    public Object addReplyTask(@PathVariable String projectId, TaskReply taskReply) {
        User user = commonService.getCurrentUser();

        TaskReply taskReplyResponse = taskReplyService.createNewTaskReply(taskReply, user);
        return new TaskReplyDto(taskReplyResponse);
    }


    /**
     * @param projectId
     * @param *RawFormat taskId
     * @return TasksDto
     */
    @PutMapping(value = "/projects/{projectId}/tasks/markTaskAsDone")
    public Object markTaskAsDone(@PathVariable String projectId,@RequestBody String taskId) {
        Long userId = commonService.getCurrentUserId();
        return taskService.markTaskAsDone(taskId, userId);
    }


}
