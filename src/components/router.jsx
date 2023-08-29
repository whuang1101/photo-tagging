import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import Leaderboard from "./Leaderboard";
const Router = () => {
    const router = createBrowserRouter([
      {
        path: "/",
        element: <Home />,
        errorElement: <Leaderboard />
      },
      {
        path: "/leaderboard",
        element: <Leaderboard />,
      },
    ]);
  
    return <RouterProvider router={router} />;
  };
  
  export default Router;