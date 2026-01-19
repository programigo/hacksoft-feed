import { createBrowserRouter } from "react-router"
import Home from "./pages/Home"
import { RouterProvider } from "react-router"
import RootLayout from "./pages/RootLayout"

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
    ]
  }
])

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}
