import React, { useState } from "react";
import { Button } from "../ui/Button";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { Loading } from "../components/Loading";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isLoggedAtom, loggedUserAtom } from "../atoms";

export const NewBlog = () => {
  const isLogged = useRecoilValue(isLoggedAtom);
  const [blogInputs, setBlogInputs] = useState({
    title: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  console.log(blogInputs);
  const newPostHandler = async () => {
    setLoading(true);
    const res = await axios.post(`${BACKEND_URL}/api/v1/blog`, blogInputs, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    setLoading(false);
    navigate("/blogs");
  };

  if (!isLogged) {
    return (
      <div className="w-5/6 font-extralight mt-10 text-xl mx-auto text-center">
        You'll have to login first
      </div>
    );
  }

  return (
    <div className="w-4/6 mx-auto mt-5">
      <input
        type="text"
        placeholder="Your title"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setBlogInputs((prev) => {
            return {
              ...prev,
              title: e.target.value,
            };
          })
        }
        className="focus:outline-none text-xl p-2 border-b border-slate-200 mb-5 w-full"
      />
      <textarea
        id="message"
        rows={8}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setBlogInputs((prev) => {
            return {
              ...prev,
              content: e.target.value,
            };
          })
        }
        className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:outline-none"
        placeholder="What's the content"
      ></textarea>

      {!loading && (
        <Button
          btnName="Post"
          btnClass="mt-3 w-fit px-4 py-2 rounded-3xl hover:shadow-lg hover:bg-white hover:text-black"
          onClick={newPostHandler}
        />
      )}
      {loading && (
        <div className="mt-3 w-fit px-6 py-2 rounded-3xl bg-slate-50 shadow-md hover:shadow-lg hover:bg-white hover:text-black">
          <Loading />
        </div>
      )}
    </div>
  );
};
