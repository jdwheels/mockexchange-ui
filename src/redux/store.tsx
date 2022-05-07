import React, {
  createContext, FC, ReactNode, useMemo, useReducer,
} from 'react';
import { AppStateActions } from './types';
import { initialState } from './initialState';
import { counterReducer, envReducer } from './reducers';
import { counterActionCreators, envActionCreators } from './actions';

const Context = createContext<AppStateActions>({
  state: initialState,
  actions: {
    setEnv: () => {},
    increment: () => {},
    decrement: () => {},
    incrementByAmount: () => {},
  },
});

interface XProps {
  children: ReactNode;
}

export const X: FC<XProps> = function ({ children }) {
  const [counter, dispatchCount] = useReducer(counterReducer, initialState.counter);
  const [env, dispatchEnv] = useReducer(envReducer, initialState.env);

  const state = useMemo<AppStateActions>(() => ({
    state: {
      counter,
      env,
    },
    actions: {
      ...envActionCreators(dispatchEnv),
      ...counterActionCreators(dispatchCount),
    },
  }), [counter, env, dispatchCount, dispatchEnv]);

  return (
    <Context.Provider value={state}>
      {children}
    </Context.Provider>
  );
};

export default Context;
