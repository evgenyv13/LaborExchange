import taskTypes from '../action-types/task';
import constants from './constants';

const initialState = {
  task: {},
  tasks: {},
  activeTasks: {},
  openedTasks: {},
  closedTasks: {}
};

export function taskReducer(state = initialState, action) {
  switch (action.type) {
    // GET TASK
    case taskTypes.GET_TASK_REQUEST:
      return {
        ...state,
        status: constants.status.PENDING
      };
    case taskTypes.GET_TASK_SUCCESS:
      return {
        ...state,
        task: action.payload,
        status: constants.status.SUCCESS
      };
    case taskTypes.GET_TASK_FAILURE:
      return {
        ...state,
        error: action.payload,
        status: constants.status.FAILURE
      };

    // GET TASKS
    case taskTypes.GET_TASKS_REQUEST:
      return {
        ...state,
        status: constants.status.PENDING
      };
    case taskTypes.GET_TASKS_SUCCESS:
      return {
        ...state,
        tasks: action.payload,
        status: constants.status.SUCCESS
      };
    case taskTypes.GET_TASKS_FAILURE:
      return {
        ...state,
        error: action.payload,
        status: constants.status.FAILURE
      };

    // CREATE TASK
    case taskTypes.CREATE_TASK_REQUEST:
      return {
        ...state,
        status: constants.status.PENDING
      };
    case taskTypes.CREATE_TASK_SUCCESS:
      return {
        ...state,
        task: action.payload,
        status: constants.status.SUCCESS
      };
    case taskTypes.CREATE_TASK_FAILURE:
      return {
        ...state,
        error: action.payload,
        status: constants.status.FAILURE
      };

    // EDIT TASK
    case taskTypes.EDIT_TASK_REQUEST:
      return {
        ...state,
        status: constants.status.PENDING
      };
    case taskTypes.EDIT_TASK_SUCCESS:
      return {
        ...state,
        task: action.payload,
        status: constants.status.SUCCESS
      };
    case taskTypes.EDIT_TASK_FAILURE:
      return {
        ...state,
        error: action.payload,
        status: constants.status.FAILURE
      };

    // SET TASK EXECUTION
    case taskTypes.SET_TASK_EXECUTION_REQUEST:
      return {
        ...state,
        status: constants.status.PENDING
      };
    case taskTypes.SET_TASK_EXECUTION_SUCCESS:
      return {
        ...state,
        task: action.payload,
        status: constants.status.SUCCESS
      };
    case taskTypes.SET_TASK_EXECUTION_FAILURE:
      return {
        ...state,
        error: action.payload,
        status: constants.status.FAILURE
      };

    // GET ACTIVE TASKS
    case taskTypes.GET_ACTIVE_TASKS_REQUEST:
      return {
        ...state,
        status: constants.status.PENDING
      };
    case taskTypes.GET_ACTIVE_TASKS_SUCCESS:
      return {
        ...state,
        activeTasks: action.payload,
        status: constants.status.SUCCESS
      };
    case taskTypes.GET_ACTIVE_TASKS_FAILURE:
      return {
        ...state,
        error: action.payload,
        status: constants.status.FAILURE
      };

    // GET OPENED TASKS
    case taskTypes.GET_OPENED_TASKS_REQUEST:
      return {
        ...state,
        status: constants.status.PENDING
      };
    case taskTypes.GET_OPENED_TASKS_SUCCESS:
      return {
        ...state,
        openedTasks: action.payload,
        status: constants.status.SUCCESS
      };
    case taskTypes.GET_OPENED_TASKS_FAILURE:
      return {
        ...state,
        error: action.payload,
        status: constants.status.FAILURE
      };

    // GET CLOSED TASKS
    case taskTypes.GET_CLOSED_TASKS_REQUEST:
      return {
        ...state,
        status: constants.status.PENDING
      };
    case taskTypes.GET_CLOSED_TASKS_SUCCESS:
      return {
        ...state,
        closedTasks: action.payload,
        status: constants.status.SUCCESS
      };
    case taskTypes.GET_CLOSED_TASKS_FAILURE:
      return {
        ...state,
        error: action.payload,
        status: constants.status.FAILURE
      };

    // GET PROJECT TASKS
    case taskTypes.GET_PROJECT_TASKS_REQUEST:
      return {
        ...state,
        status: constants.status.PENDING
      };
    case taskTypes.GET_PROJECT_TASKS_SUCCESS:
      return {
        ...state,
        tasks: action.payload,
        status: constants.status.SUCCESS
      };
    case taskTypes.GET_PROJECT_TASKS_FAILURE:
      return {
        ...state,
        error: action.payload,
        status: constants.status.FAILURE
      };

    default:
      return state;
  }
}
