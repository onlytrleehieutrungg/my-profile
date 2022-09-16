import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {User} from "../../packages/auth/components/user";
import {request} from "./request";
import {IGenericResponse} from "./types";
export interface LoginDto extends Pick<User, "email" | "password"> {}

export const authApi = {
  loginGoogle: async (token: string) => {
    try {
      const res = await request.get<{token: string}>(
        `/auth/google?credential=${token}`
      );
      return res.data.token;
    } catch (error) {
      return "";
    }
  },
  login: async (data: LoginDto) => {
    try {
      const res = await request.post("/user/authenticate", data);
      return res.data;
    } catch (error) {
      return "";
    }
  },
};
