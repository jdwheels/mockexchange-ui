import { useContext } from 'react';
import Context from './redux/store';

export function useTestEnv(): number {
  const { state } = useContext(Context);
  return state.env.test;
}
