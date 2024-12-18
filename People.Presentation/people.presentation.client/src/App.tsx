import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PageNotFound } from "./pages/page-not-found/PageNotFound";
import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { People } from "./pages/people/People";
import { Home } from "@mui/icons-material";

/**
 * @returns {JSX.Element} component
 */
export const App = () => {
  const router = createBrowserRouter([
    {
      path: "*",
      element: <PageNotFound />,
    },
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/people",
      element: <People />,
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
};
