import { Dispatch } from 'react';
import { AppAction, StoreEnv } from './types';

export const SET_ENV = 'setEnv';

export const INCREMENT = 'increment';

export const DECREMENT = 'decrement';

export const INCREMENT_BY_AMOUNT = 'incrementByAmount';

const setEnv = (env: StoreEnv) => ({
  type: SET_ENV,
  payload: env,
});

const increment = () => ({ type: INCREMENT });

const decrement = () => ({ type: DECREMENT });

const incrementByAmount = (amount: number) => ({
  type: INCREMENT_BY_AMOUNT,
  payload: amount,
});

export const envActionCreators = (dispatch: Dispatch<AppAction<StoreEnv>>) => ({
  setEnv: (payload: StoreEnv) => dispatch(setEnv(payload)),
});

export const counterActionCreators = (dispatch: Dispatch<AppAction<number | never>>) => ({
  increment: () => dispatch(increment()),
  decrement: () => dispatch(decrement()),
  incrementByAmount: (payload: number) => dispatch(incrementByAmount(payload)),
});
