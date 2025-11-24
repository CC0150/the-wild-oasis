import { Navigate } from "react-router";
import { lazy } from "react";
import PageLoader from "@/components/pageLoader/PageLoader";

const Login = lazy(() => import("@/pages/Login"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Users = lazy(() => import("@/pages/Users"));
const Settings = lazy(() => import("@/pages/Settings"));
const Bookings = lazy(() => import("@/pages/Bookings"));
const Cabins = lazy(() => import("@/pages/Cabins"));
const Account = lazy(() => import("@/pages/Account"));
const Booking = lazy(() => import("@/pages/Booking"));
const Checkin = lazy(() => import("@/pages/Checkin"));
const ProtectedRoute = lazy(() => import("@/pages/ProtectedRoute"));
const AppLayout = lazy(() => import("@/pages/AppLayout"));
const PageNotFound = lazy(() => import("@/pages/PageNotFound"));

const routes = [
  {
    path: "/",
    element: (
      <PageLoader>
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      </PageLoader>
    ),
    children: [
      {
        path: "/",
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "/dashboard",
        element: (
          <PageLoader>
            <Dashboard />
          </PageLoader>
        ),
      },
      {
        path: "/users",
        element: (
          <PageLoader>
            <Users />
          </PageLoader>
        ),
      },
      {
        path: "/settings",
        element: (
          <PageLoader>
            <Settings />
          </PageLoader>
        ),
      },

      {
        path: "/bookings",
        element: (
          <PageLoader>
            <Bookings />
          </PageLoader>
        ),
      },
      {
        path: "/bookings/:bookingId",
        element: (
          <PageLoader>
            <Booking />
          </PageLoader>
        ),
      },
      {
        path: "/checkin/:bookingId",
        element: (
          <PageLoader>
            <Checkin />
          </PageLoader>
        ),
      },
      {
        path: "/cabins",
        element: (
          <PageLoader>
            <Cabins />
          </PageLoader>
        ),
      },
      {
        path: "/account",
        element: (
          <PageLoader>
            <Account />
          </PageLoader>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <PageLoader>
        <Login />
      </PageLoader>
    ),
  },
  {
    path: "*",
    element: (
      <PageLoader>
        <PageNotFound />
      </PageLoader>
    ),
  },
];

export default routes;
