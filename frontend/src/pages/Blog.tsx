
import { Avatar } from "../components/BlogCard";
import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";
import { Loading } from "../components/Loading";
import { useRecoilValue } from "recoil";
import { isLoggedAtom } from "../atoms";

export const Blog = () => {
  const { id } = useParams();
  const { blog, loading } = useBlog(id as string);
  const isLogged = useRecoilValue(isLoggedAtom);

  if (!isLogged) {
    return (
      <div className="w-5/6 font-extralight mt-10 text-xl mx-auto text-center">
        You'll have to login first
      </div>
    );
  }

  return (
    <div>
      {loading && (
        <div className="w-5/6 mx-auto  grid grid-cols-12 my-20">
          <Loading />
        </div>
      )}
      {!loading && blog && (
        <div className="w-5/6 mx-auto md:grid md:grid-cols-12 mt-10">
          <div className="col-span-8 w-11/12">
            <h1 className="mb-5 text-4xl font-black">{blog?.title}</h1>
            <p className="text-slate-700 text-lg font-extralight">
              {blog?.content}
            </p>
          </div>
          <div className="col-span-4 mt-8">
            <p className="mb-5 font-extralight text-lg">Author</p>
            <div className="flex items-center gap-4">
              <div className=" justify-self-center">
                {!loading && (
                  <Avatar
                    size={"12"}
                    authorName={blog?.author.name as string}
                  />
                )}
              </div>
              <div className="grow">
                <h2 className="text-xl font-semibold mb-2">
                  {blog?.author.name}
                </h2>
                <p className=" text-slate-400 ">
                  Master of merth, purveyor of puns and the funniest person in
                  the kingdom
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
