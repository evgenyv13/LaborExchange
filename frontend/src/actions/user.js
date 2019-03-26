import userTypes from '../action-types/user';
import userService from './index';

export const getUser = id => {
  return async dispatch => {
    dispatch({
      type: userTypes.GET_USER_REQUEST,
      payload: {}
    });

    try {
      const result = await userService.getInfoAboutUser(id);
      dispatch({
        type: userTypes.GET_USER_SUCCESS,
        payload: result
      });
    } catch (error) {
      dispatch({
        type: userTypes.GET_USER_FAILURE,
        payload: error
      });
    }
  };
};

export const getInfoAboutMe = () => {
  return async dispatch => {
    dispatch({
      type: userTypes.GET_INFO_ABOUT_ME_REQUEST,
      payload: {}
    });

    try {
      const result = await userService.getInfoAboutMe();
      dispatch({
        type: userTypes.GET_INFO_ABOUT_ME_SUCCESS,
        payload: result
      });
    } catch (error) {
      dispatch({
        type: userTypes.GET_INFO_ABOUT_ME_FAILURE
      });
    }
  };
};

export const editUser = user => {
  return async dispatch => {
    dispatch({
      type: userTypes.EDIT_USER_REQUEST,
      payload: {}
    });

    try {
      const result = await userService.updateUser(user);
      dispatch({
        type: userTypes.EDIT_USER_SUCCESS,
        payload: result
      });
    } catch (error) {
      dispatch({
        type: userTypes.EDIT_USER_FAILURE,
        payload: error
      });
    }
  };
};

export const getUserComments = () => {
  return async dispatch => {
    dispatch({
      type: userTypes.GET_USER_COMMENTS_REQUEST,
      payload: {}
    });

    try {
      const result = await userService.getCommentsForMe();
      dispatch({
        type: userTypes.GET_USER_COMMENTS_SUCCESS,
        payload: result
      });
    } catch (error) {
      dispatch({
        type: userTypes.GET_USER_COMMENTS_FAILURE,
        payload: error
      });
    }
  };
};

export const addUserLanguage = data => {
  return async dispatch => {
    dispatch({
      type: userTypes.ADD_USER_LANGUAGE_REQUEST,
      payload: {}
    });

    try {
      const result = await userService.addLanguage(data);
      dispatch({
        type: userTypes.ADD_USER_LANGUAGE_SUCCESS,
        payload: result
      });
    } catch (error) {
      dispatch({
        type: userTypes.ADD_USER_LANGUAGE_FAILURE,
        payload: error
      });
    }
  };
};

export const deleteUserLanguage = id => {
  return async dispatch => {
    dispatch({
      type: userTypes.DELETE_USER_LANGUAGE_REQUEST,
      payload: {}
    });

    try {
      const result = await userService.deleteLanguageLevel(id);
      dispatch({
        type: userTypes.DELETE_USER_LANGUAGE_SUCCESS,
        payload: result
      });
    } catch (error) {
      dispatch({
        type: userTypes.DELETE_USER_LANGUAGE_FAILURE,
        payload: error
      });
    }
  };
};

export const addUserEducation = data => {
  return async dispatch => {
    dispatch({
      type: userTypes.ADD_USER_EDUCATION_REQUEST,
      payload: {}
    });

    try {
      const result = await userService.addEducation(data);
      dispatch({
        type: userTypes.ADD_USER_EDUCATION_SUCCESS,
        payload: result
      });
    } catch (error) {
      dispatch({
        type: userTypes.ADD_USER_EDUCATION_FAILURE,
        payload: error
      });
    }
  };
};

export const deleteUserEducation = id => {
  return async dispatch => {
    dispatch({
      type: userTypes.DELETE_USER_EDUCATION_REQUEST,
      payload: {}
    });

    try {
      const result = await userService.deleteEducation(id);
      dispatch({
        type: userTypes.DELETE_USER_EDUCATION_SUCCESS,
        payload: result
      });
    } catch (error) {
      dispatch({
        type: userTypes.DELETE_USER_EDUCATION_FAILURE,
        payload: error
      });
    }
  };
};

export const addUserSkill = data => {
  return async dispatch => {
    dispatch({
      type: userTypes.ADD_USER_SKILL_REQUEST,
      payload: {}
    });

    try {
      const result = await userService.addSkill(data);
      dispatch({
        type: userTypes.ADD_USER_SKILL_SUCCESS,
        payload: result
      });
    } catch (error) {
      dispatch({
        type: userTypes.ADD_USER_SKILL_FAILURE,
        payload: error
      });
    }
  };
};

export const deleteUserSkill = id => {
  return async dispatch => {
    dispatch({
      type: userTypes.DELETE_USER_SKILL_REQUEST,
      payload: {}
    });

    try {
      const result = await userService.deleteSkill(id);
      dispatch({
        type: userTypes.DELETE_USER_SKILL_SUCCESS,
        payload: result
      });
    } catch (error) {
      dispatch({
        type: userTypes.DELETE_USER_SKILL_FAILURE,
        payload: error
      });
    }
  };
};

export const addUserWorkExperience = data => {
  return async dispatch => {
    dispatch({
      type: userTypes.ADD_USER_WORK_EXPERIENCE_REQUEST,
      payload: {}
    });

    try {
      const result = await userService.addWorkExperience(data);
      dispatch({
        type: userTypes.ADD_USER_WORK_EXPERIENCE_SUCCESS,
        payload: result
      });
    } catch (error) {
      dispatch({
        type: userTypes.ADD_USER_WORK_EXPERIENCE_FAILURE,
        payload: error
      });
    }
  };
};

export const deleteUserWorkExperience = id => {
  return async dispatch => {
    dispatch({
      type: userTypes.DELETE_USER_WORK_EXPERIENCE_REQUEST,
      payload: {}
    });

    try {
      const result = await userService.deleteWorkingPlace(id);
      dispatch({
        type: userTypes.DELETE_USER_WORK_EXPERIENCE_SUCCESS,
        payload: result
      });
    } catch (error) {
      dispatch({
        type: userTypes.DELETE_USER_WORK_EXPERIENCE_FAILURE,
        payload: error
      });
    }
  };
};

export default userTypes;
