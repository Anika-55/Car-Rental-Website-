import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../components/Login";
import MainLayout from "../layout/MainLayout";
import CarDetails from "../pages/CarDetails";
import Cars from "../pages/Cars";
import MyBookings from "../pages/MyBookings";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: () => fetch("http://localhost:3000/cars"),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "car-details/:id",
        element: <CarDetails />,
      },
      {
        path: "cars",
        element: <Cars />,
        loader: () => fetch("http://localhost:3000/cars"),
      },
      {
        path: "my-bookings",
        element: <MyBookings />,
      },
    ],
  },
]);
