import axios, {AxiosError} from "axios";
import {apiActions, store} from "../store";
import Cookies from "universal-cookie";
import {constant} from "../constant";

const request = axios.create({
  baseURL: process.env.SPOTIFY_BASE_URL,
  withCredentials: true,
});

request.interceptors.request.use(function (req) {
  store.dispatch(apiActions.initReq());
  const cookies = new Cookies();
  const token = cookies.get(constant.TOKEN_COOKIE_KEY) || "";
  if (token && req.headers) req.headers[constant.TOKEN_HEADER_KEY] = `${token}`;
  return req;
});

request.interceptors.response.use(
  function (response) {
    store.dispatch(apiActions.resetState());
    if (response?.data?.message)
      store.dispatch(apiActions.updateSuccessMessage(response.data));

    return response;
  },
  function (error: AxiosError<any, any>) {
    store.dispatch(apiActions.resetState());
    if (error.response?.status)
      store.dispatch(apiActions.updateErrorDetails(error.response.data));

    return Promise.reject(error.response);
  }
);

export {request};
