import "../src/lib/dayjs";
import { createBrowserRouter } from "react-router";
import ErrorPage from "./pages/Error";
import { RouterProvider } from "react-router";
import RootLayout from "./pages/RootLayout";
import AuthContextProvider from "./store/auth/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { requireAuth } from "./features/auth/requireAuth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", lazy: () => import("./pages/Home") },
      { path: "/login", lazy: () => import("./pages/Login") },
      { path: "/signup", lazy: () => import("./pages/Signup") },
      { path: "/users/me", lazy: () => import("./pages/ProfileDetails"), loader: requireAuth, },
    ],
  },
]);

const queryClient = new QueryClient();

// This code is only for TypeScript
declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__:
      import("@tanstack/query-core").QueryClient;
  }
}

// This code is for all users
window.__TANSTACK_QUERY_CLIENT__ = queryClient;

export default function App() {
  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthContextProvider>
  )
}
