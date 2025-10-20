// Redux相关类型
export interface RootState {
  counter: CounterState;
  user: UserState;
}

export interface CounterState {
  value: number;
}

export interface UserState {
  name: string;
  isLoggedIn: boolean;
}

// 路由相关类型
export interface RouteConfig {
  path: string;
  name: string;
  element: React.ReactElement;
  children?: RouteConfig[];
}

