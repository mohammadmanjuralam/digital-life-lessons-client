import { createBrowserRouter } from "react-router";
import ErrorPage from "../RootLayOut/ErrorPage/ErrorPage";
import Root from "../RootLayOut/Root";
import Home from "../Pages/Home/Home";
import PublicLesson from "../Pages/Home/PublicLesson/PublicLesson";
import Login from "../Pages/Authentication/Login/Login";
import Register from "../Pages/Authentication/Register/Register";
import AddLesson from "../Pages/Home/Add Lesson/AddLesson";
import MyLesson from "../Pages/Home/MyLesson/MyLesson";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "public-lesson",
        Component: PublicLesson,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "add-lesson",
        Component: AddLesson,
      },
      {
        path: "my-lessons",
        Component: MyLesson,
      },
      {
        path: "public-lessons",
        Component: PublicLesson,
      },
    ],
  },
]);
