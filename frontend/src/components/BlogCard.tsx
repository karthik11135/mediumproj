import React from "react";
import { StarIcon } from "../ui/Icons";
import { Link } from "react-router-dom";

interface BlogCardProps {
  publishedDate: string;
  title: string;
  content: string;
  blogId: string;
  authorName: string;
}

export const BlogCard = ({
  publishedDate,
  title,
  content,
  authorName,
  blogId,
}: BlogCardProps) => {
  return (
    <div className="mx-auto py-3 cursor-pointer border-b border-slate-200  mt-1.5 ">
      <Link to={`./${blogId}`}>
        <div className="flex gap-3 w-fit mb-2.5">
          <Avatar size={"5"} authorName={authorName} />
          <p className="font-light text-sm">{authorName}</p>
          <p className=" me-1 text-slate-400 text-sm">{publishedDate}</p>
        </div>
        <h1 className="text-2xl font-bold mb-1.5">{title}</h1>
        <p className=" font-extralight text-slate-800 mb-1.5">
          {content.slice(0, 250) + "..."}
        </p>
        <p className=" text-sm  text-slate-400">
          {Math.ceil(content.length / 300)} min read
        </p>
      </Link>
    </div>
  );
};

export const Avatar = ({
  authorName,
  size,
}: {
  authorName: string;
  size: string;
}) => {
  return (
    <div className="h-full  ">
      <div
        className={` flex items-center justify-center w-${size} h-${size} w-7 h-7  bg-gray-100 rounded-full dark:bg-gray-600`}
      >
        <p className="font-medium p-2 text-gray-600 dark:text-gray-300">
          {authorName && authorName[0]}
        </p>
      </div>
    </div>
  );
};
