package com.laborExchange.coremodule.tasks.service;

import com.laborExchange.coremodule.common.exception.AccessDeniedException;
import com.laborExchange.coremodule.common.exception.EntityNotFoundCustomException;
import com.laborExchange.coremodule.common.exception.UncorrectEntityException;
import com.laborExchange.coremodule.odt.Odt;
import com.laborExchange.coremodule.project.dto.ProjectDto;
import com.laborExchange.coremodule.project.entity.Project;
import com.laborExchange.coremodule.project.repository.ProjectRepository;
import com.laborExchange.coremodule.projectOwners.ProjectOwners;
import com.laborExchange.coremodule.projectOwners.ProjectOwnersRepository;
import com.laborExchange.coremodule.tasks.dto.TasksDto;
import com.laborExchange.coremodule.tasks.entity.Tasks;
import com.laborExchange.coremodule.tasks.repository.TaskRepository;
import com.laborExchange.coremodule.tasksReply.dto.TaskReplyDto;
import com.laborExchange.coremodule.tasksReply.entity.TaskReply;
import com.laborExchange.coremodule.user.dto.UserDto;
import com.laborExchange.coremodule.user.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.sql.Timestamp;
import java.util.List;

@Service
public class TaskServiceImpl implements TaskService {
    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;
    private final ProjectOwnersRepository projectOwnersRepository;

    @Autowired
    public TaskServiceImpl(TaskRepository taskRepository, ProjectRepository projectRepository, ProjectOwnersRepository projectOwnersRepository) {
        this.taskRepository = taskRepository;
        this.projectRepository = projectRepository;
        this.projectOwnersRepository = projectOwnersRepository;
    }

    @Override
    public Page<Tasks> getTasksByPage(Pageable pageable) {
        return taskRepository.findByUserAccepteedIsNull(pageable);
    }

    @Override
    @Transactional
    public TasksDto markTaskAsDone(String taskId, Long requiredUserId) {
        Long taskIdL = Long.parseLong(taskId);
        Tasks task = taskRepository.findById(taskIdL).orElseThrow(() -> new EntityNotFoundCustomException("Task not found , id : " + taskId));
        Project project = task.getProject();

        if( task.getDone() ){
            throw new UncorrectEntityException("Task is already marked as done");
        }
        if(!task.getProject().getProjectOwner().getId().equals(requiredUserId)) {
            throw new AccessDeniedException("You have not got permission . ( Only project owner may do this )");
        }

        task.setProgress(100);
        task.setDone(true);

        ProjectOwners projectOwners = projectOwnersRepository.findByUserAndProject(task.getUserAccepteed(), task.getProject());

        if (projectOwners == null) {
            projectOwners = new ProjectOwners(task.getUserAccepteed(), task.getPaymentPercent(), task.getProject());
        } else {
            projectOwners.setPercent(projectOwners.getPercent() + task.getPaymentPercent());
        }

        if(project.getFreezeToken()>=task.getPaymentPercent()){
            project.setFreezeToken(project.getFreezeToken()- task.getPaymentPercent() );
        }else {
            throw new UncorrectEntityException("ERROR : FREEZE TOKEN IS LOWER THEN PAYMENT TOKEN");
        }

        projectOwnersRepository.save(projectOwners);
        return new TasksDto(task);
    }

    @Override
    public TasksDto findTaskById(String id, Long requestingUser) {
        Long taskIdL = Long.parseLong(id);
        Tasks task = taskRepository.findById(taskIdL).orElseThrow(() -> new EntityNotFoundCustomException("Task with id " + taskIdL + " not found"));

        TasksDto tasksDto = new TasksDto(task);
        tasksDto.setProject(new ProjectDto(task.getProject()));
        tasksDto.getProject().setProjectOwner(new UserDto(task.getProject().getProjectOwner()));


        if (task.getProject().getProjectOwner().getId() == requestingUser) {
            if (task.getUserAccepteed() != null) {
                tasksDto.setUserAccepteed(new UserDto(task.getUserAccepteed()));
            } else {
                List<TaskReplyDto> taskReplyDtos = Odt.convertLists(task.getReplyingTasks(), TaskReplyDto::new);
                if (taskReplyDtos != null) tasksDto.setReplyingTasks(taskReplyDtos);
            }
        }
        return tasksDto;
    }

    @Override
    @Transactional
    public Tasks acceptUserToDoTaskByTaskReply(User requsetUser, TaskReply taskReply) {
        Tasks tasks = taskReply.getTask();
        Project taskProject = tasks.getProject();
        User acceptedUser = taskReply.getUser();

        if (taskProject.getProjectOwner().getId() != requsetUser.getId()) {
            throw new AccessDeniedException("You have not got permissions for this action ( not owner of project )");
        }
        if (acceptedUser == null || tasks.getUserAccepteed() != null) {
            throw new UncorrectEntityException("Accepted user is null or task already have accepted user");
        }

        if (taskReply.getWantedPercent() > tasks.getPaymentPercent()) {
            float differencePercent = taskReply.getWantedPercent() - tasks.getPaymentPercent();

            ProjectOwners projectOwners = projectOwnersRepository.findByUserAndProject(taskProject.getProjectOwner(), taskProject);
            if (projectOwners.getPercent() > differencePercent) {
                // postpone the required percentage
                projectOwners.setPercent(projectOwners.getPercent() - differencePercent);
                taskProject.setFreezeToken(taskProject.getFreezeToken() + differencePercent);
                tasks.setUserAccepteed(acceptedUser);
                tasks.setPaymentPercent(taskReply.getWantedPercent());
            } else {
                throw new UncorrectEntityException("You have not got too much percent's as user wanted ( " + taskReply.getWantedPercent() + " )");
            }
        } else {
            if (tasks.getPaymentPercent() != taskReply.getWantedPercent()) {
                float differencePercent = taskReply.getWantedPercent() - tasks.getPaymentPercent();
                ProjectOwners projectOwners = projectOwnersRepository.findByUserAndProject(taskProject.getProjectOwner(), taskProject);
                projectOwners.setPercent(projectOwners.getPercent() - differencePercent);
                taskProject.setFreezeToken(taskProject.getFreezeToken() + differencePercent);
            }
            tasks.setUserAccepteed(acceptedUser);
        }

        return taskRepository.save(tasks);
    }

    @Override
    @Transactional
    public Tasks createTaskInProject(Tasks task, User user, String projectId) {
        Long projectIdLong = Long.parseLong(projectId);

        Project project = projectRepository.findById(projectIdLong).orElseThrow(() -> new EntityNotFoundException("project not found"));

        if (!project.getProjectOwner().getId().equals(user.getId())) {
            throw new AccessDeniedException("Current user is not project owner");
        }

        if (task.getPaymentPercent() < 0.001) {
            task.setPaymentPercent(0.001f);
        }

        ProjectOwners projectOwners = projectOwnersRepository.findByUserAndProject(user, project);

        if (projectOwners.getPercent() <= task.getPaymentPercent()) {
            throw new UncorrectEntityException("You have not got " + task.getPaymentPercent() + " tokens of this project");
        } else {
            Timestamp creatingDateAndTime = new Timestamp(System.currentTimeMillis());
            task.setCreatingDate(creatingDateAndTime);

            projectOwners.setPercent(projectOwners.getPercent() - task.getPaymentPercent());
            project.setFreezeToken(project.getFreezeToken() + task.getPaymentPercent());
            task.setProject(project);
            taskRepository.save(task);
        }

        return task;
    }

    @Override
    public Page<TasksDto> getOpenTasks(Pageable pageable, String projectIdString) {
        Long projectId = Long.parseLong(projectIdString);
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new EntityNotFoundException("project not found, id = " + projectId));

        Page<Tasks> tasks = taskRepository.findTasksByProjectAndUserAccepteedIsNull(project, pageable);
        return tasks.map(TasksDto::new);
    }

    @Override
    public Page<TasksDto> getRunningTasks(Long projectId, Long userId, Pageable pageable) {
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new EntityNotFoundException("project not found, id = " + projectId));

        if (!project.getProjectOwner().getId().equals(userId)) {
            throw new AccessDeniedException("this user have not got permissions to view running tasks in project : " + projectId);
        }

        Page<Tasks> tasks = taskRepository.findTasksByProjectAndUserAccepteedIsNotNullAndDoneIsFalse(project, pageable);
        return tasks.map(TasksDto::new);
    }

    @Override
    public Page<TasksDto> getClosedTasks(Long projectId, Long userId, Pageable pageable) {
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new EntityNotFoundException("project not found, id = " + projectId));

        if (!project.getProjectOwner().getId().equals(userId)) {
            throw new AccessDeniedException("this user have not got permissions to view closed tasks in project : " + projectId);
        }

        Page<Tasks> tasks = taskRepository.findTasksByProjectAndUserAccepteedIsNotNullAndDoneIsTrue(project, pageable);
        return tasks.map(TasksDto::new);
    }

    @Override
    public Page<Tasks> getUserActiveTasks(User user, Pageable pageable) {
        return taskRepository.findByUserAccepteedAndDoneIsFalse(user, pageable);
    }


}
