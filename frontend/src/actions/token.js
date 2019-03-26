import tokenTypes from '../action-types/token';
import userService from './index';

export const sellProjectTokens = (projectId, tokensAmount) => {
  return async dispatch => {
    dispatch({
      type: tokenTypes.SELL_PROJECT_TOKENS_REQUEST,
      payload: {}
    });

    try {
      const result = await userService.sellProjectTokens(
        projectId,
        tokensAmount
      );
      dispatch({
        type: tokenTypes.SELL_PROJECT_TOKENS_SUCCESS,
        payload: result
      });
    } catch (error) {
      dispatch({
        type: tokenTypes.SELL_PROJECT_TOKENS_FAILURE,
        payload: error
      });
    }
  };
};

export const getProjectOwners = (projectId, page) => {
  return async dispatch => {
    dispatch({
      type: tokenTypes.GET_PROJECT_TOKEN_OWNERS_REQUEST,
      payload: {}
    });

    try {
      const result = await userService.getProjectOwners(projectId, page);
      dispatch({
        type: tokenTypes.GET_PROJECT_TOKEN_OWNERS_SUCCESS,
        payload: result
      });
    } catch (error) {
      dispatch({
        type: tokenTypes.GET_PROJECT_TOKEN_OWNERS_FAILURE,
        payload: error
      });
    }
  };
};

export const getProjectTokenSalary = (projectId, page) => {
  return async dispatch => {
    dispatch({
      type: tokenTypes.GET_PROJECT_TOKEN_SALARY_REQUEST,
      payload: {}
    });

    try {
      const result = await userService.getProjectTokenSalary(projectId, page);
      dispatch({
        type: tokenTypes.GET_PROJECT_TOKEN_SALARY_SUCCESS,
        payload: result
      });
    } catch (error) {
      dispatch({
        type: tokenTypes.GET_PROJECT_TOKEN_SALARY_FAILURE,
        payload: error
      });
    }
  };
};

export const setProjectTokenPrice = (projectId, tokenPrice) => {
  return async dispatch => {
    dispatch({
      type: tokenTypes.SET_PROJECT_TOKEN_PRICE_REQUEST,
      payload: {}
    });

    try {
      const result = await userService.setProjectTokenPrice(
        projectId,
        tokenPrice
      );
      dispatch({
        type: tokenTypes.SET_PROJECT_TOKEN_PRICE_SUCCESS,
        payload: result
      });
    } catch (error) {
      dispatch({
        type: tokenTypes.SET_PROJECT_TOKEN_PRICE_FAILURE,
        payload: error
      });
    }
  };
};

export const backSellProjectTokens = (projectId, tokensAmount) => {
  return async dispatch => {
    dispatch({
      type: tokenTypes.BACK_SELL_PROJECT_TOKENS_REQUEST,
      payload: {}
    });

    try {
      const result = await userService.backSellProjectTokens(
        projectId,
        tokensAmount
      );
      dispatch({
        type: tokenTypes.BACK_SELL_PROJECT_TOKENS_SUCCESS,
        payload: result
      });
    } catch (error) {
      dispatch({
        type: tokenTypes.BACK_SELL_PROJECT_TOKENS_FAILURE,
        payload: error
      });
    }
  };
};

export const buyToken = tokenAmount => {
  return async dispatch => {
    dispatch({
      type: tokenTypes.BUY_TOKEN_REQUEST,
      payload: {}
    });

    try {
      const result = await userService.buyToken(tokenAmount);
      dispatch({
        type: tokenTypes.BUY_TOKEN_SUCCESS,
        payload: result
      });
    } catch (error) {
      dispatch({
        type: tokenTypes.BUY_TOKEN_FAILURE,
        payload: error
      });
    }
  };
};

export const getTokenTrading = page => {
  return async dispatch => {
    dispatch({
      type: tokenTypes.GET_TOKEN_TRADING_REQUEST,
      payload: {}
    });

    try {
      const result = await userService.getTokenTrading(page);
      dispatch({
        type: tokenTypes.GET_TOKEN_TRADING_SUCCESS,
        payload: result
      });
    } catch (error) {
      dispatch({
        type: tokenTypes.GET_TOKEN_TRADING_FAILURE,
        payload: error
      });
    }
  };
};

export const getUserTokens = page => {
  return async dispatch => {
    dispatch({
      type: tokenTypes.GET_USER_TOKENS_REQUEST,
      payload: {}
    });

    try {
      const result = await userService.getUserTokens(page);
      dispatch({
        type: tokenTypes.GET_USER_TOKENS_SUCCESS,
        payload: result
      });
    } catch (error) {
      dispatch({
        type: tokenTypes.GET_USER_TOKENS_FAILURE,
        payload: error
      });
    }
  };
};
