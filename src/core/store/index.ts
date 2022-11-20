import {combineReducers, configureStore} from "@reduxjs/toolkit";
import counterReducer, {CounterState} from "./counter";
import {userReducer, UserState} from "../store/user/";
import {useSelector} from "react-redux";
import {apiReducer, ApiState} from "../store/api";
import {SpotifyState} from "./spotify";
export interface RootState {
  api: ApiState;
  user: UserState;
  counter: CounterState;
}

const reducers = combineReducers<RootState>({
  counter: counterReducer,
  user: userReducer,
  api: apiReducer,
});
export const store = configureStore({
  reducer: reducers,
  devTools: process.env.NODE_ENV === "development",
  middleware: getDefaultMiddleware => getDefaultMiddleware({}).concat([]),
});

export const useStoreApi = () =>
  useSelector<RootState, ApiState>(state => state.api);
export const useStoreUser = () =>
  useSelector<RootState, UserState>(state => state.user);
export const useStoreCounter = () =>
  useSelector<RootState, CounterState>(state => state.counter);

export * from "./api";
export * from "./user";
export * from "./counter";
export * from "./spotify";
