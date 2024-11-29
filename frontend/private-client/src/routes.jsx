import AuthPage from "@/pages/Auth/AuthPage.jsx";
import Admin from "@/pages/Admin/Admin.jsx";
import ErrorPage from "@/components/ErrorPage.jsx";

const routes = [
  {
    path: "/",
    element: <AuthPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin/:page",
    element: <Admin />,
  },
];

export default routes;
