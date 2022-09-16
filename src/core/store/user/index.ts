import {createSlice} from "@reduxjs/toolkit";

export interface UserState {
  userId: string;
  name: string;
  email: string;
  address: string;
  createdOn: string;
  updateOn: string;
  status: boolean;
  password: string;
}

const initialState: UserState = {
  userId: "",
  name: "",
  email: "",
  address: "",
  createdOn: "",
  updateOn: "",
  status: false,
  password: "",
};

const reducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: () => ({...initialState}),
    setUser: state => ({...state, isLogin: true}),
  },
});

export const userActions = {
  ...reducer.actions,
};
export const userReducer = reducer.reducer;
