import Home from "@/pages/Home/Home.jsx";
import AllPosts from "@/pages/AllPosts/AllPosts.jsx";
import PostPage from "@/pages/PostPage/PostPage.jsx";

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/all-posts/:pageNumber",
    element: <AllPosts />,
  },
  {
    path: "/post/:postId",
    element: <PostPage />,
  },
];

export default routes;
