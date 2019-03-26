import userTypes from '../action-types/user';
import constants from './constants';

const initialState = {
  user: {},
  comments: {},
  languages: {},
  education: {},
  skills: {},
  workExperience: {}
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    // GET USER
    case userTypes.GET_USER_REQUEST:
      return {
        ...state,
        status: constants.status.PENDING
      };
    case userTypes.GET_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        status: constants.status.SUCCESS
      };
    case userTypes.GET_USER_FAILURE:
      return {
        ...state,
        error: action.payload,
        status: constants.status.FAILURE
      };

    // GET INFO ABOUT ME

    case userTypes.GET_INFO_ABOUT_ME_REQUEST:
      return {
        ...state,
        status: constants.status.PENDING
      };
    case userTypes.GET_INFO_ABOUT_ME_SUCCESS:
      return {
        ...state,
        user: action.payload,
        status: constants.status.SUCCESS
      };
    case userTypes.GET_INFO_ABOUT_ME_FAILURE:
      return {
        ...state,
        error: action.payload,
        status: constants.status.FAILURE
      };

    // EDIT USER
    case userTypes.EDIT_USER_REQUEST:
      return {
        ...state,
        status: constants.status.PENDING
      };
    case userTypes.EDIT_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        status: constants.status.SUCCESS
      };
    case userTypes.EDIT_USER_FAILURE:
      return {
        ...state,
        error: action.payload,
        status: constants.status.FAILURE
      };

    // GET USER COMMENTS
    case userTypes.GET_USER_COMMENTS_REQUEST:
      return {
        ...state,
        status: constants.status.PENDING
      };
    case userTypes.GET_USER_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: action.payload,
        status: constants.status.SUCCESS
      };
    case userTypes.GET_USER_COMMENTS_FAILURE:
      return {
        ...state,
        error: action.payload,
        status: constants.status.FAILURE
      };

    // ADD USER LANGUAGE
    case userTypes.ADD_USER_LANGUAGE_REQUEST:
      return {
        ...state,
        status: constants.status.PENDING
      };
    case userTypes.ADD_USER_LANGUAGE_SUCCESS:
      return {
        ...state,
        languages: action.payload,
        status: constants.status.SUCCESS
      };
    case userTypes.ADD_USER_LANGUAGE_FAILURE:
      return {
        ...state,
        error: action.payload,
        status: constants.status.FAILURE
      };

    // DELETE USER LANGUAGE
    case userTypes.DELETE_USER_LANGUAGE_REQUEST:
      return {
        ...state,
        status: constants.status.PENDING
      };
    case userTypes.DELETE_USER_LANGUAGE_SUCCESS:
      return {
        ...state,
        languages: action.payload,
        status: constants.status.SUCCESS
      };
    case userTypes.DELETE_USER_LANGUAGE_FAILURE:
      return {
        ...state,
        error: action.payload,
        status: constants.status.FAILURE
      };

    // ADD USER EDUCATION
    case userTypes.ADD_USER_EDUCATION_REQUEST:
      return {
        ...state,
        status: constants.status.PENDING
      };
    case userTypes.ADD_USER_EDUCATION_SUCCESS:
      return {
        ...state,
        education: action.payload,
        status: constants.status.SUCCESS
      };
    case userTypes.ADD_USER_EDUCATION_FAILURE:
      return {
        ...state,
        error: action.payload,
        status: constants.status.FAILURE
      };

    // DELETE USER EDUCATION
    case userTypes.DELETE_USER_EDUCATION_REQUEST:
      return {
        ...state,
        status: constants.status.PENDING
      };
    case userTypes.DELETE_USER_EDUCATION_SUCCESS:
      return {
        ...state,
        education: action.payload,
        status: constants.status.SUCCESS
      };
    case userTypes.DELETE_USER_EDUCATION_FAILURE:
      return {
        ...state,
        error: action.payload,
        status: constants.status.FAILURE
      };

    // ADD USER SKILL
    case userTypes.ADD_USER_SKILL_REQUEST:
      return {
        ...state,
        status: constants.status.PENDING
      };
    case userTypes.ADD_USER_SKILL_SUCCESS:
      return {
        ...state,
        skills: action.payload,
        status: constants.status.SUCCESS
      };
    case userTypes.ADD_USER_SKILL_FAILURE:
      return {
        ...state,
        error: action.payload,
        status: constants.status.FAILURE
      };

    // DELETE USER SKILL
    case userTypes.DELETE_USER_SKILL_REQUEST:
      return {
        ...state,
        status: constants.status.PENDING
      };
    case userTypes.DELETE_USER_SKILL_SUCCESS:
      return {
        ...state,
        skills: action.payload,
        status: constants.status.SUCCESS
      };
    case userTypes.DELETE_USER_SKILL_FAILURE:
      return {
        ...state,
        error: action.payload,
        status: constants.status.FAILURE
      };

    // ADD USER WORK EXPERIENCE
    case userTypes.ADD_USER_WORK_EXPERIENCE_REQUEST:
      return {
        ...state,
        status: constants.status.PENDING
      };
    case userTypes.ADD_USER_WORK_EXPERIENCE_SUCCESS:
      return {
        ...state,
        workExperience: action.payload,
        status: constants.status.SUCCESS
      };
    case userTypes.ADD_USER_WORK_EXPERIENCE_FAILURE:
      return {
        ...state,
        error: action.payload,
        status: constants.status.FAILURE
      };

    // DELETE USER WORK EXPERIENCE
    case userTypes.DELETE_USER_WORK_EXPERIENCE_REQUEST:
      return {
        ...state,
        status: constants.status.PENDING
      };
    case userTypes.DELETE_USER_WORK_EXPERIENCE_SUCCESS:
      return {
        ...state,
        workExperience: action.payload,
        status: constants.status.SUCCESS
      };
    case userTypes.DELETE_USER_WORK_EXPERIENCE_FAILURE:
      return {
        ...state,
        error: action.payload,
        status: constants.status.FAILURE
      };

    default:
      return state;
  }
}

export default userTypes;
