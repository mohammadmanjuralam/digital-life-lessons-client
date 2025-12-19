import { createBrowserRouter } from "react-router";

import Root from "../RootLayOut/Root";
import Home from "../Pages/Home/Home";

import Login from "../Pages/Authentication/Login/Login";
import Register from "../Pages/Authentication/Register/Register";
import AddLesson from "../Pages/Home/Add Lesson/AddLesson";
import MyLesson from "../Pages/Home/MyLesson/MyLesson";
import PrivateRoutes from "./PrivateRoutes/PrivateRoutes";
import PricingPlan from "../Pages/Pricing Plan/PricingPlan";
import DashBoardLayout from "../DashboardLayout/DashboardLayout";
import Dashboard from "../DashboardLayout/Dashboard";
import ErrorPage from "../DashboardLayout/ErrorPage/ErrorPage";
import LessonDetailsPage from "../Pages/Home/PublicLesson/LessonDetailsPage/LessonDetailsPage";
import PublicLesson from "../Pages/Home/PublicLesson/PublicLesson";
import PaymentSuccess from "../Pages/PaymentSuccess/PaymentSuccess";
import PaymentCancel from "../Pages/PaymentCancel/PaymentCancel";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "public-lessons",
        element: <PublicLesson />,
      },
      {
        path: "lesson-details/:id",
        element: <LessonDetailsPage />,
      },
      {
        path: "lesson/:id",
        element: (
          <PrivateRoutes>
            <LessonDetailsPage />
          </PrivateRoutes>
        ),
      },
      {
        path: "payment-success",
        element: (
          <PrivateRoutes>
            <PaymentSuccess />
          </PrivateRoutes>
        ),
      },
      {
        path: "payment-cancel",
        element: (
          <PrivateRoutes>
            <PaymentCancel />
          </PrivateRoutes>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "public-lessons",
        element: (
          <PrivateRoutes>
            <PublicLesson />
          </PrivateRoutes>
        ),
      },
      {
        path: "pricing-plan",
        element: (
          <PrivateRoutes>
            <PricingPlan />
          </PrivateRoutes>
        ),
      },
    ],
  },

  // Dashboard Routes
  {
    path: "dashboard",
    element: <DashBoardLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "add-lesson",
        element: (
          <PrivateRoutes>
            <AddLesson />
          </PrivateRoutes>
        ),
      },
      {
        path: "my-lessons",
        element: (
          <PrivateRoutes>
            <MyLesson />
          </PrivateRoutes>
        ),
      },
    ],
  },
]);
