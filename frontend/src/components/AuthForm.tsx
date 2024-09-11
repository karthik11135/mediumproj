import React from "react";
import { FormField } from "../ui/FormField";
import { Button } from "../ui/Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { signupType } from "@karthikrk11135/common-app";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { Loading } from "./Loading";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { isLoggedAtom, loggedUserAtom } from "../atoms";

interface AuthFormProps {
  type: "signup" | "signin";
}

export const AuthForm = ({ type }: AuthFormProps) => {
  const navigate = useNavigate();
  const setIsLogged = useSetRecoilState(isLoggedAtom);
  const setLoggedUser = useSetRecoilState(loggedUserAtom);
  const [authInputs, setAuthInputs] = useState<signupType>({
    email: "",
    name: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const sendReqHandler = async (): Promise<void> => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type}`,
        authInputs
      );
      const token: string = res.data.jwt;
      localStorage.setItem("jwt", token);
      setLoading(false);
      setIsLogged(true);
      setLoggedUser(res.data.name);
      navigate("/blogs");
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <div className="h-screen w-4/6 lg:w-3/6 mx-auto flex   items-center">
      <div className="w-full">
        <div className="text-center mb-10 w-full">
          <h1 className="font-bold mb-2 text-3xl">
            {type === "signup" ? "Create an Account" : "Login to your account"}
          </h1>

          <p className="text-md text-slate-600">
            Already have an account?{" "}
            <Link
              to={`${type === "signup" ? "/signin" : "/signup"}`}
              className="underline cursor-pointer"
            >
              {type === "signup" ? "Login" : "Signup"}
            </Link>
          </p>
        </div>
        <div>
          {type === "signup" && (
            <FormField
              fieldLabel="Enter your username"
              fieldName="Username"
              fieldType="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAuthInputs((authIps) => {
                  return {
                    ...authIps,
                    name: e.target.value,
                  };
                })
              }
            />
          )}
          <FormField
            fieldLabel="Your email"
            fieldName="Email"
            fieldType="email"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAuthInputs((authIps) => {
                return {
                  ...authIps,
                  email: e.target.value,
                };
              })
            }
          />
          <FormField
            fieldLabel="Enter your password"
            fieldName="Password"
            fieldType="password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAuthInputs((authIps) => {
                return {
                  ...authIps,
                  password: e.target.value,
                };
              })
            }
          />
          {!loading && <Button onClick={sendReqHandler} btnName={type==='signup'? "Sign up" : "Login"} />}
          {loading && (
            <div className="text-center p-2 bg-black rounded-md">
              <Loading />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
