import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
const Router = () => {
    const router = createBrowserRouter([
      {
        path: "/",
        element: <Home />,
      },
    ]);
  
    return <RouterProvider router={router} />;
  };
  
  export default Router;