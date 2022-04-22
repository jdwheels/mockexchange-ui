import { AppAction, AppState, StoreEnv } from './types';
import {
  DECREMENT, INCREMENT, INCREMENT_BY_AMOUNT, SET_ENV,
} from './actions';

export const envReducer = (
  state: StoreEnv,
  action: AppAction<StoreEnv>,
): StoreEnv => {
  switch (action.type) {
    case SET_ENV: {
      return <StoreEnv>action.payload;
    }
    default: {
      return state;
    }
  }
};

export const counterReducer = (state: AppState['counter'], action: AppAction<number>): AppState['counter'] => {
  switch (action.type) {
    case INCREMENT: {
      return {
        ...state,
        value: state.value + 1,
      };
    }
    case DECREMENT: {
      return {
        ...state,
        value: state.value - 1,
      };
    }
    case INCREMENT_BY_AMOUNT: {
      return {
        ...state,
        value: state.value + <number>action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
