import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Login from "./features/auth/pages/login";
import Register from "./features/auth/pages/Register";
import Protected from "./features/auth/component/Protected";
import Home from "./features/interview/pages/Home";
import Interview from "./features/interview/pages/interview";
import AdminDashboard from "./features/admin/AdminDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: (
          <Protected>
            <Home />
          </Protected>
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
        path: "tech",
        element: (
          <Protected>
            <Interview />
          </Protected>
        ),
      },
      {
        path: "admin",
        element: (
          <Protected role="admin">
            <AdminDashboard />
          </Protected>
        ),
      },
      {
        path: "*",
        element: <h1>404 - Page Not Found</h1>,
      },
    ],
  },
]);
