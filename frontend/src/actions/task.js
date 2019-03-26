import taskTypes from '../action-types/task';
import userService from './index';

export const getTask = taskId => {
  return async dispatch => {
    dispatch({
      type: taskTypes.GET_TASK_REQUEST,
      payload: {}
    });

    try {
      const result = await userService.getTaskData(taskId);
      dispatch({
        type: taskTypes.GET_TASK_SUCCESS,
        payload: result
      });
    } catch (error) {
      dispatch({
        type: taskTypes.GET_TASK_FAILURE,
        payload: error
      });
    }
  };
};

export const getTasks = page => {
  return async dispatch => {
    dispatch({
      type: taskTypes.GET_TASKS_REQUEST,
      payload: {}
    });

    try {
      const result = await userService.getAllTasks(page);
      dispatch({
        type: taskTypes.GET_TASKS_SUCCESS,
        payload: result
      });
    } catch (error) {
      dispatch({
        type: taskTypes.GET_TASKS_FAILURE,
        payload: error
      });
    }
  };
};

export const createTask = task => {
  return async dispatch => {
    dispatch({
      type: taskTypes.CREATE_TASK_REQUEST,
      payload: {}
    });

    try {
      const result = await userService.createTask(task);
      dispatch({
        type: taskTypes.CREATE_TASK_SUCCESS,
        payload: result
      });
    } catch (error) {
      dispatch({
        type: taskTypes.CREATE_TASK_FAILURE,
        payload: error
      });
    }
  };
};

export const editTask = () => {
  return async dispatch => {
    dispatch({
      type: taskTypes.EDIT_TASK_REQUEST,
      payload: {}
    });

    try {
      const result = await userService.editTask();
      dispatch({
        type: taskTypes.EDIT_TASK_SUCCESS,
        payload: result
      });
    } catch (error) {
      dispatch({
        type: taskTypes.EDIT_TASK_FAILURE,
        payload: error
      });
    }
  };
};

export const setTaskExecution = (projectId, formData) => {
  return async dispatch => {
    dispatch({
      type: taskTypes.SET_TASK_EXECUTION_REQUEST,
      payload: {}
    });

    try {
      const result = await userService.sendRequestOnTaskExecution(
        projectId,
        formData
      );
      dispatch({
        type: taskTypes.SET_TASK_EXECUTION_SUCCESS,
        payload: result
      });
    } catch (error) {
      dispatch({
        type: taskTypes.SET_TASK_EXECUTION_FAILURE,
        payload: error
      });
    }
  };
};

export const getActiveTasks = (projectId, page) => {
  return async dispatch => {
    dispatch({
      type: taskTypes.GET_ACTIVE_TASKS_REQUEST,
      payload: {}
    });

    try {
      const result = await userService.getActiveTasks(projectId, page);
      dispatch({
        type: taskTypes.GET_ACTIVE_TASKS_SUCCESS,
        payload: result
      });
    } catch (error) {
      dispatch({
        type: taskTypes.GET_ACTIVE_TASKS_FAILURE,
        payload: error
      });
    }
  };
};

export const getOpenedTasks = (projectId, page) => {
  return async dispatch => {
    dispatch({
      type: taskTypes.GET_OPENED_TASKS_REQUEST,
      payload: {}
    });

    try {
      const result = await userService.getOpenedTasks(projectId, page);
      dispatch({
        type: taskTypes.GET_OPENED_TASKS_SUCCESS,
        payload: result
      });
    } catch (error) {
      dispatch({
        type: taskTypes.GET_OPENED_TASKS_FAILURE,
        payload: error
      });
    }
  };
};

export const getClosedTasks = (projectId, page) => {
  return async dispatch => {
    dispatch({
      type: taskTypes.GET_CLOSED_TASKS_REQUEST,
      payload: {}
    });

    try {
      const result = await userService.getClosedTasks(projectId, page);
      dispatch({
        type: taskTypes.GET_CLOSED_TASKS_SUCCESS,
        payload: result
      });
    } catch (error) {
      dispatch({
        type: taskTypes.GET_CLOSED_TASKS_FAILURE,
        payload: error
      });
    }
  };
};

export const getProjectTasks = projectId => {
  return async dispatch => {
    dispatch({
      type: taskTypes.GET_PROJECT_TASKS_REQUEST,
      payload: {}
    });

    try {
      const result = await userService.getProjectTasks(projectId);
      dispatch({
        type: taskTypes.GET_PROJECT_TASKS_SUCCESS,
        payload: result
      });
    } catch (error) {
      dispatch({
        type: taskTypes.GET_PROJECT_TASKS_FAILURE,
        payload: error
      });
    }
  };
};

export default taskTypes;
