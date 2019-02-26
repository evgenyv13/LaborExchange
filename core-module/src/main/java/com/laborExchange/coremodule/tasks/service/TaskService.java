package com.laborExchange.coremodule.tasks.service;

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
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Service
public class TaskService {
    @Autowired
    TaskRepository taskRepository;
    @Autowired
    ProjectRepository projectRepository;
    @Autowired
    ProjectOwnersRepository projectOwnersRepository;

    public Page<Tasks> getTasksByPage(int pageId) {
        return taskRepository.findByUserAccepteedIsNull(PageRequest.of(pageId - 1, 5));
    }

    public TasksDto markTaskAsDone(String taskId,User requiredUser){
        Long taskIdL = Long.parseLong(taskId);
        Optional<Tasks> task = taskRepository.findById(taskIdL);
        if(!task.isPresent() || task.get().getProject().getProjectOwner().getId()!=requiredUser.getId() || task.get().getDone()) return null;

        task.get().setProgress(100);
        task.get().setDone(true);

        ProjectOwners projectOwners = projectOwnersRepository.findByUserAndProject(task.get().getUserAccepteed(),task.get().getProject());
        if(projectOwners==null){
            projectOwners = new ProjectOwners();
            projectOwners.setProject(task.get().getProject());
            projectOwners.setUser(task.get().getUserAccepteed());
            projectOwners.setPercent(task.get().getPaymentPercent());
        }
        else {
            projectOwners.setPercent(projectOwners.getPercent()+task.get().getPaymentPercent());
        }
        projectOwnersRepository.save(projectOwners);
        return new TasksDto(task.get());
    }

    public Tasks findTaskById(String id) {
        Long taskIdL = Long.parseLong(id);
        Optional<Tasks> task = taskRepository.findById(taskIdL);
        if (!task.isPresent()) return null;
        return task.get();
    }

    public TasksDto findTaskById(String id, User requestingUser) {
        Long taskIdL = Long.parseLong(id);
        Optional<Tasks> task = taskRepository.findById(taskIdL);
        if (!task.isPresent()) return null;

        TasksDto tasksDto = new TasksDto(task.get());
        tasksDto.setProject(new ProjectDto(task.get().getProject()));
        tasksDto.getProject().setProjectOwner(new UserDto(task.get().getProject().getProjectOwner()));


        if (task.get().getProject().getProjectOwner().getId() == requestingUser.getId()) {
            if (task.get().getUserAccepteed() != null) {
                tasksDto.setUserAccepteed(new UserDto(task.get().getUserAccepteed()));
            } else {
                List<TaskReplyDto> taskReplyDtos = Odt.convertLists(task.get().getReplyingTasks(), TaskReplyDto::new);
                if (taskReplyDtos != null) tasksDto.setReplyingTasks(taskReplyDtos);
            }
        }
        return tasksDto;
    }

    public Tasks getTaskEntityById(String id) {
        Long taskIdL = Long.parseLong(id);
        Optional<Tasks> task = taskRepository.findById(taskIdL);
        if (!task.isPresent()) return null;

        return task.get();
    }

    public Boolean acceptUserToDoTaskByTaskReply(User requsetUser, TaskReply taskReply) {
        if (requsetUser == null || taskReply == null) return false;
        Tasks tasks = taskReply.getTask();
        if (tasks.getProject().getProjectOwner().getId() != requsetUser.getId()) return false;
        User acceptedUser = taskReply.getUser();
        if (acceptedUser == null) return false;
        tasks.setUserAccepteed(acceptedUser);
        taskRepository.save(tasks);
        return true;
    }

    public Tasks createTaskInProject(Tasks task, User user, String projectId) {
        Long projectIdLong = Long.parseLong(projectId);
        if (user == null || task == null) return null;
        Optional<Project> project = projectRepository.findById(projectIdLong);
        if (task.getPaymentPercent() < 0.1) task.setPaymentPercent(0.01f);
        Timestamp creatingDateAndTime = new Timestamp(System.currentTimeMillis());
        task.setCreatingDate(creatingDateAndTime);
        if (!project.isPresent() || !project.get().getProjectOwner().getId().equals(user.getId())) return null;
        task.setProject(project.get());
        return taskRepository.save(task);
    }

    public Page<TasksDto> getOpenTasks(int pageId,String projectIdString){
        Long projectId = Long.parseLong(projectIdString); if(projectId==null) return null;
        Optional<Project> project = projectRepository.findById(projectId); if(!project.isPresent()) return null;
        Page<Tasks> tasks = taskRepository.findTasksByProjectAndUserAccepteedIsNull(project.get(),PageRequest.of(pageId - 1, 5));
        return tasks.map(task -> new TasksDto(task));
    }

    public Page<TasksDto> getRunningTasks(User user,int pageId,String projectIdString){
        Long projectId = Long.parseLong(projectIdString); if(projectId==null) return null;
        Optional<Project> project = projectRepository.findById(projectId); if(!project.isPresent() || user==null) return null;
        if(user.getId()!=project.get().getProjectOwner().getId()) return null;

        Page<Tasks> tasks = taskRepository.findTasksByProjectAndUserAccepteedIsNotNullAndDoneIsFalse(project.get(),PageRequest.of(pageId - 1, 5));
        return tasks.map(task -> new TasksDto(task));
    }

    public Page<TasksDto> getClosedTasks(User user,int pageId,String projectIdString){
        Long projectId = Long.parseLong(projectIdString); if(projectId==null) return null;
        Optional<Project> project = projectRepository.findById(projectId); if(!project.isPresent() || user==null) return null;
        if(user.getId()!=project.get().getProjectOwner().getId()) return null;

        Page<Tasks> tasks = taskRepository.findTasksByProjectAndUserAccepteedIsNotNullAndDoneIsTrue(project.get(),PageRequest.of(pageId - 1, 5));
        return tasks.map(task -> new TasksDto(task));
    }


}
