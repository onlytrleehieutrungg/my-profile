import axios, {AxiosError} from "axios";
import {apiActions, store} from "../store";
import Cookies from "universal-cookie";

const request = axios.create({
  baseURL: process.env.SPOTIFY_BASE_URL,
  withCredentials: true,
});

export {request};
