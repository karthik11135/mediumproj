import  { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface blogType {
  title: string;
  content: string;
  id: string;
  author: {
    name: string;
  };
}

export const useBlogs = () => {
  const [blogs, setBlogs] = useState<blogType[]>([]);
  const [loading, setLoading] = useState(false);

  const getBlogs = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      setBlogs(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return { blogs, loading };
};

export const useBlog = (id: string) => {
  const [blog, setBlog] = useState<blogType>();
  const [loading, setLoading] = useState(false);

  const getBlogs = async () => {
    setLoading(true);
    console.log('helloadsfa')
    try {
      const res = await axios.get(
        `${BACKEND_URL}/api/v1/blog/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      console.log(res.data)
      setBlog(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return { blog, loading };
};
