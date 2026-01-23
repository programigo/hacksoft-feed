import "../src/lib/dayjs";
import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import ErrorPage from "./pages/Error";
import { RouterProvider } from "react-router";
import RootLayout from "./pages/RootLayout";
import AuthContextProvider from "./store/auth/AuthProvider";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { requireAuth } from "./features/auth/requireAuth";
import ProfileDetails from "./pages/ProfileDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/users/me", element: <ProfileDetails />, loader: requireAuth, },
    ],
  },
]);

const queryClient = new QueryClient();

export default function App() {
  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthContextProvider>
  )
}
