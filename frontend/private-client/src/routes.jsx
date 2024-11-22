import AuthPage from "@/pages/Auth/AuthPage.jsx";
import Admin from "@/pages/Admin/Admin.jsx";

const routes = [
  {
    path: "/",
    element: <AuthPage />,
  },
  {
    path: "/admin/:page",
    element: <Admin />,
  },
];

export default routes;
