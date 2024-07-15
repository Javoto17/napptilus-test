import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";

import Detail from "./pages/Detail";

import store from "./store";

import "./styles/global.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/:id",
    element: <Detail />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
