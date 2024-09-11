import React from "react";
import { signupType } from "@karthikrk11135/common-app";
import { Quote } from "../components/Quote";
import { AuthForm } from "../components/AuthForm";

export const Signin = () => {
  return (
    <div className="h-screen md:grid md:grid-cols-2 w-full">
      <div>
        <AuthForm type={'signin'} />
      </div>
      <div className="bg-slate-100">
       <Quote />
      </div>
    </div>
  );
};
