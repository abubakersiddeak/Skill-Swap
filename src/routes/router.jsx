import { createBrowserRouter } from "react-router";

import Root from "../pages/rootpage/Root";

import ErrorPage from "../pages/error/ErrorPage";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import PrivetRoute from "../pages/privetPage/PrivetRoute";
import Profile from "../pages/Profile";
import Main from "../pages/Main";
import SkillDetails from "../components/SkillDetails";
import ForgotPassword from "../pages/ForgotPassword";
import About from "../components/About";
import AllSkills from "../pages/allSkill";
import Contact from "../pages/Contact";
import Support from "../pages/Support";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Main },
      { path: "login", Component: Login },
      { path: "signup", Component: Signup },

      { path: "about", Component: About },
      { path: "all-skills", Component: AllSkills },
      { path: "contact", Component: Contact },
      { path: "support", Component: Support },
      { path: "*", Component: ErrorPage },
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
        element: <SkillDetails />,
      },
      { path: "forgot-password/:email", Component: ForgotPassword },
    ],
  },
]);
