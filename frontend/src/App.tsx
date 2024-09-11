import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Blog } from "./pages/Blog";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { Blogs } from "./pages/Blogs";
import { Appbar } from "./components/Appbar";
import { RecoilRoot } from "recoil";
import { NewBlog } from "./pages/NewBlog";

function App() {
  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <Appbar />
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/blogs/:id" element={<Blog />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path='/newblog' element={<NewBlog />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
}

export default App;
