import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider.jsx";
import routes from "./routes.jsx";
import "./index.css";

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark">
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
);
