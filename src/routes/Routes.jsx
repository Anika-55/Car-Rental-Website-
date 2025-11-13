import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../components/Login";
import MainLayout from "../layout/MainLayout";
import CarDetails from "../pages/CarDetails";
import Cars from "../pages/Cars";
import MyBookings from "../pages/MyBookings";
import AddCar from "../pages/AddCar";
import MyListing from "../pages/MyListing";
import PrivateRoute from "./PrivateRoute";
import NotFound from "../components/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: () => fetch("https://car-r-server.vercel.app/cars"),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "car-details/:id",
        element: (
          <PrivateRoute>
            <CarDetails />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://car-r-server.vercel.app/cars/${params.id}`),
      },
      {
        path: "cars",
        element: <Cars />,
        loader: () => fetch("https://car-r-server.vercel.app/cars"),
      },
      {
        path: "my-bookings",
        element: (
          <PrivateRoute>
            <MyBookings />
          </PrivateRoute>
        ),
      },
      {
        path: "add-car",
        element: (
          <PrivateRoute>
            <AddCar />
          </PrivateRoute>
        ),
      },
      {
        path: "my-listing",
        element: (
          <PrivateRoute>
            <MyListing />
          </PrivateRoute>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
