import tokenTypes from '../action-types/token';
import constants from './constants';

const initialState = {
  token: {},
  tokens: {},
  owners: {},
  tradingProject: {},
  tokenSellers: {}
};

export function tokenReducer(state = initialState, action) {
  switch (action.type) {
    // SELL PROJECT TOKENS
    case tokenTypes.SELL_PROJECT_TOKENS_REQUEST:
      return {
        ...state,
        status: constants.status.PENDING
      };
    case tokenTypes.SELL_PROJECT_TOKENS_SUCCESS:
      return {
        ...state,
        tokens: action.payload,
        status: constants.status.SUCCESS
      };
    case tokenTypes.SELL_PROJECT_TOKENS_FAILURE:
      return {
        ...state,
        error: action.payload,
        status: constants.status.FAILURE
      };

    // GET PROJECT TOKEN OWNERS
    case tokenTypes.GET_PROJECT_TOKEN_OWNERS_REQUEST:
      return {
        ...state,
        status: constants.status.PENDING
      };
    case tokenTypes.GET_PROJECT_TOKEN_OWNERS_SUCCESS:
      return {
        ...state,
        owners: action.payload,
        status: constants.status.SUCCESS
      };
    case tokenTypes.GET_PROJECT_TOKEN_OWNERS_FAILURE:
      return {
        ...state,
        error: action.payload,
        status: constants.status.FAILURE
      };

    // GET PROJECT TOKEN SALARY
    case tokenTypes.GET_PROJECT_TOKEN_SALARY_REQUEST:
      return {
        ...state,
        status: constants.status.PENDING
      };
    case tokenTypes.GET_PROJECT_TOKEN_SALARY_SUCCESS:
      return {
        ...state,
        tokenSellers: action.payload,
        status: constants.status.SUCCESS
      };
    case tokenTypes.GET_PROJECT_TOKEN_SALARY_FAILURE:
      return {
        ...state,
        error: action.payload,
        status: constants.status.FAILURE
      };

    // SET PROJECT TOKEN PRICE
    case tokenTypes.SET_PROJECT_TOKEN_PRICE_REQUEST:
      return {
        ...state,
        status: constants.status.PENDING
      };
    case tokenTypes.SET_PROJECT_TOKEN_PRICE_SUCCESS:
      return {
        ...state,
        token: action.payload,
        status: constants.status.SUCCESS
      };
    case tokenTypes.SET_PROJECT_TOKEN_PRICE_FAILURE:
      return {
        ...state,
        error: action.payload,
        status: constants.status.FAILURE
      };

    // BACK SELL PROJECT TOKENS REQUEST
    case tokenTypes.BACK_SELL_PROJECT_TOKENS_REQUEST:
      return {
        ...state,
        status: constants.status.PENDING
      };
    case tokenTypes.BACK_SELL_PROJECT_TOKENS_SUCCESS:
      return {
        ...state,
        tokens: action.payload,
        status: constants.status.SUCCESS
      };
    case tokenTypes.BACK_SELL_PROJECT_TOKENS_FAILURE:
      return {
        ...state,
        error: action.payload,
        status: constants.status.FAILURE
      };

    // BUY TOKEN
    case tokenTypes.BUY_TOKEN_REQUEST:
      return {
        ...state,
        status: constants.status.PENDING
      };
    case tokenTypes.BUY_TOKEN_SUCCESS:
      return {
        ...state,
        token: action.payload,
        status: constants.status.SUCCESS
      };
    case tokenTypes.BUY_TOKEN_FAILURE:
      return {
        ...state,
        error: action.payload,
        status: constants.status.FAILURE
      };

    // GET TOKEN TRADING
    case tokenTypes.GET_TOKEN_TRADING_REQUEST:
      return {
        ...state,
        status: constants.status.PENDING
      };
    case tokenTypes.GET_TOKEN_TRADING_SUCCESS:
      return {
        ...state,
        tradingProject: action.payload,
        status: constants.status.SUCCESS
      };
    case tokenTypes.GET_TOKEN_TRADING_FAILURE:
      return {
        ...state,
        error: action.payload,
        status: constants.status.FAILURE
      };

    // GET USER TOKENS
    case tokenTypes.GET_USER_TOKENS_REQUEST:
      return {
        ...state,
        status: constants.status.PENDING
      };
    case tokenTypes.GET_USER_TOKENS_SUCCESS:
      return {
        ...state,
        tokens: action.payload,
        status: constants.status.SUCCESS
      };
    case tokenTypes.GET_USER_TOKENS_FAILURE:
      return {
        ...state,
        error: action.payload,
        status: constants.status.FAILURE
      };

    default:
      return state;
  }
}
