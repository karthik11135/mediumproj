import React, { useEffect, useState } from "react";
import { Avatar } from "./BlogCard";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { isLoggedAtom, loggedUserAtom } from "../atoms";
import axios from "axios";
import { Button } from "../ui/Button";
import { BACKEND_URL } from "../config";
import { Loading } from "./Loading";

export const Appbar = () => {
  const [isLogged, setIslogged] = useRecoilState(isLoggedAtom);
  const [loggedUser, setLoggedUser] = useRecoilState(loggedUserAtom);
  const [showLogout, setShowLogout] = useState(false);

  const loginCheckHanlder = async () => {
    const res = await axios.get(`${BACKEND_URL}/api/v1/blog/name`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });

    if (res) {
      setIslogged(true);
      console.log(res);
      setLoggedUser(res.data.name);
    }
  };

  const logoutHandler = async () => {
    localStorage.removeItem("jwt");
    setLoggedUser("");
    setIslogged(false);
  };

  useEffect(() => {
    loginCheckHanlder();
  }, []);

  return (
    <div className="border-b border-slate-200 py-2.5">
      <div className="flex  w-5/6 mx-auto ">
        <h2 className="font-bold text-lg">
          <Link to="/blogs">Medium</Link>
        </h2>
        {!isLogged && (
          <div className="flex gap-2.5 ms-auto ">
            <Link
              to="/signup"
              className="font-extralight flex cursor-pointer hover:underline items-center"
            >
              Signup
            </Link>
            <Link
              to="/signin"
              className="font-extralight flex cursor-pointer hover:underline items-center"
            >
              Login
            </Link>
          </div>
        )}

        {isLogged && (
          <div className="ms-auto relative flex items-center">
            <Link to="/newblog" className="cursor-pointer me-8">
              <Button
                onClick={() => {}}
                btnName="New"
                btnClass="h-fit bg-green-600 w-full py-1 px-5 rounded-2xl "
              />
            </Link>
            {isLogged ? (
              <span
                onClick={() => setShowLogout((prev) => !prev)}
                className="cursor-pointer "
              >
                {" "}
                <Avatar size={"9"} authorName={loggedUser as string} />
              </span>
            ) : (
              <Loading />
            )}

            {showLogout && (
              <div
                onClick={logoutHandler}
                className="absolute h-fit  px-3 font-extralight top-10 right-0 hover:bg-black hover:text-white rounded   py-3 cursor-pointer  shadow-xl"
              >
                Logout
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
