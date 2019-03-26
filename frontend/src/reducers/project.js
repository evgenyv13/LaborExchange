import projectTypes from '../action-types/project';
import constants from './constants';

const initialState = {
  project: {},
  userProjects: {},
  participantProject: {}
};

export function projectReducer(state = initialState, action) {
  switch (action.type) {
    // GET PROJECTS
    case projectTypes.GET_PROJECTS_REQUEST:
      return {
        ...state,
        status: constants.status.PENDING
      };
    case projectTypes.GET_PROJECTS_SUCCESS:
      return {
        ...state,
        projects: action.payload,
        status: constants.status.SUCCESS
      };
    case projectTypes.GET_PROJECTS_FAILURE:
      return {
        ...state,
        error: action.payload,
        status: constants.status.FAILURE
      };

    // GET USER PROJECTS
    case projectTypes.GET_USER_PROJECTS_REQUEST:
      return {
        ...state,
        status: constants.status.PENDING
      };
    case projectTypes.GET_USER_PROJECTS_SUCCESS:
      return {
        ...state,
        userProjects: action.payload,
        status: constants.status.SUCCESS
      };
    case projectTypes.GET_USER_PROJECTS_FAILURE:
      return {
        ...state,
        error: action.payload,
        status: constants.status.FAILURE
      };

    // GET PARTICIPANT PROJECTS
    case projectTypes.GET_PARTICIPANT_PROJECTS_REQUEST:
      return {
        ...state,
        status: constants.status.PENDING
      };
    case projectTypes.GET_PARTICIPANT_PROJECTS_SUCCESS:
      return {
        ...state,
        participantProject: action.payload,
        status: constants.status.SUCCESS
      };
    case projectTypes.GET_PARTICIPANT_PROJECTS_FAILURE:
      return {
        ...state,
        error: action.payload,
        status: constants.status.FAILURE
      };

    // GET PROJECT
    case projectTypes.GET_PROJECT_REQUEST:
      return {
        ...state,
        status: constants.status.PENDING
      };
    case projectTypes.GET_PROJECT_SUCCESS:
      return {
        ...state,
        project: action.payload,
        status: constants.status.SUCCESS
      };
    case projectTypes.GET_PROJECT_FAILURE:
      return {
        ...state,
        status: constants.status.FAILURE,
        error: action.payload
      };

    // EDIT PROJECT
    case projectTypes.EDIT_PROJECT_REQUEST:
      return {
        ...state,
        status: constants.status.PENDING
      };
    case projectTypes.EDIT_PROJECT_SUCCESS:
      return {
        ...state,
        project: action.payload,
        status: constants.status.SUCCESS
      };
    case projectTypes.EDIT_PROJECT_FAILURE:
      return {
        ...state,
        error: action.payload,
        status: constants.status.FAILURE
      };

    // CREATE PROJECT
    case projectTypes.CREATE_PROJECT_REQUEST:
      return {
        ...state,
        status: constants.status.PENDING
      };
    case projectTypes.CREATE_PROJECT_SUCCESS:
      return {
        ...state,
        project: action.payload,
        status: constants.status.SUCCESS
      };
    case projectTypes.CREATE_PROJECT_FAILURE:
      return {
        ...state,
        error: action.payload,
        status: constants.status.FAILURE
      };

    // ADD CATEGORY TO PROJECT
    case projectTypes.ADD_CATEGORY_TO_PROJECT_REQUEST:
      return {
        ...state,
        status: constants.status.PENDING
      };
    case projectTypes.ADD_CATEGORY_TO_PROJECT_SUCCESS:
      return {
        ...state,
        project: action.payload,
        status: constants.status.SUCCESS
      };
    case projectTypes.ADD_CATEGORY_TO_PROJECT_FAILURE:
      return {
        ...state,
        error: action.payload,
        status: constants.status.FAILURE
      };

    // DELETE CATEGORY FROM PROJECT
    case projectTypes.DELETE_CATEGORY_FROM_PROJECT_REQUEST:
      return {
        ...state,
        status: constants.status.PENDING
      };
    case projectTypes.DELETE_CATEGORY_FROM_PROJECT_SUCCESS:
      return {
        ...state,
        project: action.payload,
        status: constants.status.SUCCESS
      };
    case projectTypes.DELETE_CATEGORY_FROM_PROJECT_FAILURE:
      return {
        ...state,
        error: action.payload,
        status: constants.status.FAILURE
      };

    default:
      return state;
  }
}
