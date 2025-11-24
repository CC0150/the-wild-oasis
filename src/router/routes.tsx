import { Navigate } from "react-router";

import AppLayout from "@/pages/AppLayout";
import Dashboard from "@/pages/Dashboard";
import Settings from "@/pages/Settings";
import Users from "@/pages/Users";
import PageNotFound from "@/pages/PageNotFound";
import Bookings from "@/pages/Bookings";
import Cabins from "@/pages/Cabins";
import Account from "@/pages/Account";
import Login from "@/pages/Login";
import Booking from "@/pages/Booking";
import Checkin from "@/pages/Checkin";
import ProtectedRoute from "@/pages/ProtectedRoute";

const routes = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },

      {
        path: "/bookings",
        element: <Bookings />,
      },
      {
        path: "/bookings/:bookingId",
        element: <Booking />,
      },
      {
        path: "/checkin/:bookingId",
        element: <Checkin />,
      },
      {
        path: "/cabins",
        element: <Cabins />,
      },
      {
        path: "/account",
        element: <Account />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
];

export default routes;
