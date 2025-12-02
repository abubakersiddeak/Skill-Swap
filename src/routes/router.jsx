import { createBrowserRouter } from "react-router";

import Root from "../pages/rootpage/Root";

import ErrorPage from "../pages/error/ErrorPage";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import PrivetRoute from "../pages/privetPage/PrivetRoute";
import Profile from "../pages/Profile";
import Main from "../pages/Main";
import Home from "../pages/home/Home";
import SkillDetails from "../components/SkillDetails";
import ForgotPassword from "../pages/ForgotPassword";
import About from "../components/About";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Main },
      { path: "login", Component: Login },
      { path: "signup", Component: Signup },

      { path: "about", Component: About },
      { path: "*", Component: ErrorPage },
      {
        path: "privetRoute",
        element: (
          <PrivetRoute>
            <Home />
          </PrivetRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivetRoute>
            <Profile />
          </PrivetRoute>
        ),
      },
      {
        path: "detils/:id",
        element: (
          <PrivetRoute>
            <SkillDetails />
          </PrivetRoute>
        ),
      },
      { path: "forgot-password/:email", Component: ForgotPassword },
    ],
  },
]);
