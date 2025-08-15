import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Home } from "./pages/home"
import Layout from "./components/layouts/main-layout"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "*",
        element: <Home />,
      },
    ],
  },
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
