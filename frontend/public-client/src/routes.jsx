import Home from "@/pages/Home/Home.jsx";
import AllPosts from "@/pages/AllPosts.jsx";

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/all-posts",
    element: <AllPosts />,
  },
];

export default routes;
