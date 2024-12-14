import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/home/Home";
import People from "./pages/people/People";
import { PageNotFound } from "./pages/page-not-found/PageNotFound";
import "./App.css";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "*",
      element: <PageNotFound />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/people",
      element: <People />,
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
