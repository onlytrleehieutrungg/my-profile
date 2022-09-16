import { NextPage } from "next";
import React from "react";
import Login from "../login";
interface LoginPageProps { }
const LoginPage: NextPage<LoginPageProps> = ({ }) => {
  return (
    <div>
      <Login />
    </div>
  );
};

export default LoginPage;
