export type Defined<T> = T extends undefined ? never : T;
export type Env = Window['__env'];
export type StoreEnv = Defined<Env>;
export interface AppAction<P = unknown> {
  type: string;
  payload?: P;
}
export interface AppState {
  env: StoreEnv;
  counter: {
    value: number;
  }
}
export interface AppStateActions {
  state: AppState,
  actions: {
    setEnv: (env: StoreEnv) => void;
    increment: () => void
    decrement: () => void;
    incrementByAmount: (amount: number) => void;
  }
}
