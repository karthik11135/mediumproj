import React from "react";
import { BlogCard } from "../components/BlogCard";
import { Appbar } from "../components/Appbar";
import { Loading } from "../components/Loading";
import { useBlogs } from "../hooks";
import { useRecoilValue } from "recoil";
import { isLoggedAtom } from "../atoms";

export const Blogs = () => {
  const { blogs, loading } = useBlogs();
  const isLogged = useRecoilValue(isLoggedAtom)

  if(!isLogged) {
    return <div className="w-5/6 font-extralight mt-10 text-xl mx-auto text-center">
      You'll have to login first 
    </div>
  }

  return (
    <>
      <div className="xl:w-3/6 w-5/6 lg:w-4/6 mx-auto">
        {loading && (
          <div className="text-center mt-5">
            <Loading />
          </div>
        )}
        {blogs?.map((blog) => {
          return (
            <BlogCard
              blogId={blog.id}
              key={blog.id}
              title={blog.title}
              content={blog.content}
              authorName={blog.author.name || "Anonymous"}
              publishedDate="23 Dec, 2024"
            />
          );
        })}
      </div>
    </>
  );
};
