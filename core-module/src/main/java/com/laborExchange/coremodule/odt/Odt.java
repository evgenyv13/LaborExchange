package com.laborExchange.coremodule.odt;

import com.laborExchange.coremodule.project.entity.Project;
import com.laborExchange.coremodule.project.dto.ProjectDto;
import com.laborExchange.coremodule.tasks.entity.Tasks;
import com.laborExchange.coremodule.tasks.dto.TasksDto;
import com.laborExchange.coremodule.tasksReply.entity.TaskReply;
import com.laborExchange.coremodule.tasksReply.dto.TaskReplyDto;
import com.laborExchange.coremodule.user.entity.User;
import com.laborExchange.coremodule.user.dto.UserDto;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

/*Object Type Definition*/
public class Odt {

    public static List<ProjectDto> ListProjectToListProjectDTO(List<Project> projects) {
        if (projects == null) return null;
        List<ProjectDto> projectDtos = new ArrayList<>();
        for (Project project : projects) {
            ProjectDto projectDto = new ProjectDto(project);
            projectDtos.add(projectDto);
        }
        return projectDtos;
    }

    public static List<UserDto> ListUserToListUserDTO(List<User> users) {
        if (users == null) return null;
        List<UserDto> usersDtos = new ArrayList<>();
        for (User user : users) {
            UserDto userDto = new UserDto(user);
            usersDtos.add(userDto);
        }
        return usersDtos;
    }

    public static List<TaskReplyDto> ListTaskReplyToTaskReplyDto(List<TaskReply> taskReplies) {
        if (taskReplies == null) return null;
        List<TaskReplyDto> taskRepliesDtos = new ArrayList<>();
        for (TaskReply taskReply : taskReplies) {
            TaskReplyDto taskReplyDto = new TaskReplyDto(taskReply);
            taskRepliesDtos.add(taskReplyDto);
        }
        return taskRepliesDtos;
    }

    public static List<TasksDto> ListTaskToTaskDto(List<Tasks> tasks) {
        if (tasks == null) return null;
        List<TasksDto> taskssDtos = new ArrayList<>();
        for (Tasks task : tasks) {
            TasksDto tasksDto = new TasksDto(task);
            if (task.getUserAccepteed() != null) {
                tasksDto.setUserAccepteed(new UserDto(task.getUserAccepteed()));
            }
            taskssDtos.add(tasksDto);
        }
        return taskssDtos;
    }

    public static Object getSingleObjectFromList(List list) {
        Object object;
        try {
            object = list.get(0);
        } catch (ArrayIndexOutOfBoundsException e) {
            object = null;
        }
        return object;
    }

    public static <T, R> List<R> convertLists(List<T> objects, Function<T, R> mapper) {
        if(objects==null) return null;
        return objects.stream()
                .map(mapper)
                .collect(Collectors.toList());
    }
}
