import projectTypes from '../action-types/project';
import userService from './index';

export const getProject = projectId => {
  return async dispatch => {
    dispatch({
      type: projectTypes.GET_PROJECT_REQUEST,
      payload: {}
    });

    try {
      const result = await userService.getProject(projectId);
      dispatch({
        type: projectTypes.GET_PROJECT_SUCCESS,
        payload: result
      });
    } catch (error) {
      dispatch({
        type: projectTypes.GET_PROJECT_FAILURE,
        payload: error
      });
    }
  };
};

export const getUserProjects = pageNumber => {
  return async dispatch => {
    dispatch({
      type: projectTypes.GET_USER_PROJECTS_REQUEST,
      payload: {}
    });

    try {
      const result = await userService.getMyProjects(pageNumber);
      dispatch({
        type: projectTypes.GET_USER_PROJECTS_SUCCESS,
        payload: result
      });
    } catch (error) {
      dispatch({
        type: projectTypes.GET_USER_PROJECTS_FAILURE,
        payload: error
      });
    }
  };
};

export const getProjects = pageNumber => {
  return async dispatch => {
    dispatch({
      type: projectTypes.GET_PROJECTS_REQUEST,
      payload: {}
    });

    try {
      const result = await userService.getProjects(pageNumber);
      dispatch({
        type: projectTypes.GET_PROJECTS_SUCCESS,
        payload: result
      });
    } catch (error) {
      dispatch({
        type: projectTypes.GET_PROJECTS_FAILURE,
        payload: error
      });
    }
  };
};

export const getParticipantProjects = pageNumber => {
  return async dispatch => {
    dispatch({
      type: projectTypes.GET_PARTICIPANT_PROJECTS_REQUEST,
      payload: {}
    });

    try {
      const result = await userService.getParticipantesProjects(pageNumber);
      dispatch({
        type: projectTypes.GET_PARTICIPANT_PROJECTS_SUCCESS,
        payload: result
      });
    } catch (error) {
      dispatch({
        type: projectTypes.GET_PARTICIPANT_PROJECTS_FAILURE,
        payload: error
      });
    }
  };
};

export const createProject = project => {
  return async dispatch => {
    dispatch({
      type: projectTypes.CREATE_PROJECT_REQUEST,
      payload: {}
    });

    try {
      const result = await userService.createProject(project);
      dispatch({
        type: projectTypes.CREATE_PROJECT_SUCCESS,
        payload: result
      });
    } catch (error) {
      dispatch({
        type: projectTypes.CREATE_PROJECT_FAILURE,
        payload: error
      });
    }
  };
};

export const editProject = (projectId, projectData) => {
  return async dispatch => {
    dispatch({
      type: projectTypes.EDIT_PROJECT_REQUEST,
      payload: {}
    });

    try {
      const result = await userService.updateProject(projectId, projectData);
      dispatch({
        type: projectTypes.EDIT_PROJECT_SUCCESS,
        payload: result
      });
    } catch (error) {
      dispatch({
        type: projectTypes.EDIT_PROJECT_FAILURE,
        payload: error
      });
    }
  };
};

export const addCategoryToProject = (projectId, projectData) => {
  return async dispatch => {
    dispatch({
      type: projectTypes.ADD_CATEGORY_TO_PROJECT_REQUEST,
      payload: {}
    });

    try {
      const result = await userService.addCategory(projectId, projectData);
      dispatch({
        type: projectTypes.ADD_CATEGORY_TO_PROJECT_SUCCESS,
        payload: result
      });
    } catch (error) {
      dispatch({
        type: projectTypes.ADD_CATEGORY_TO_PROJECT_FAILURE,
        payload: error
      });
    }
  };
};

export const deleteCategoryFromProject = (projectId, projectData) => {
  return async dispatch => {
    dispatch({
      type: projectTypes.DELETE_CATEGORY_FROM_PROJECT_REQUEST,
      payload: {}
    });

    try {
      const result = await userService.deleteCategory(projectId, projectData);
      dispatch({
        type: projectTypes.DELETE_CATEGORY_FROM_PROJECT_SUCCESS,
        payload: result
      });
    } catch (error) {
      dispatch({
        type: projectTypes.DELETE_CATEGORY_FROM_PROJECT_FAILURE,
        payload: error
      });
    }
  };
};
