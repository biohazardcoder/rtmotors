import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setError, setPending, setUser } from "./toolkit/UserSlicer";
import { useEffect, useMemo } from "react";
import { Fetch } from "./middlewares/Fetch";
import Layout from "./components/layouts/main-layout";
import { Orders } from "./pages/orders";
import type { RootState } from "./store/RootStore";
import Loading from "./pages/loading";
import Login from "./pages/login";
import { Error } from "./pages/error";
import { Users } from "./pages/users";
import { Brands } from "./pages/brands";
import { Partners } from "./pages/partner";
import { Auctions } from "./pages/auctions";
import { Cars } from "./pages/cars";

function App() {
  const { isPending, isAuth } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  
  useEffect(() => {
    async function getMyData() {
      try {
        dispatch(setPending());
        const response = (await Fetch.get("admin/me")).data;
        if (response.data) {
          dispatch(setUser(response.data));
        } else {
          dispatch(setError("No user data available"));
        }
      } catch (error) {
        const err = error as Error;
        dispatch(setError(err.message || "Unknown error"));
        console.error(error);
      }
    }
    getMyData();
  }, [dispatch]);

  const router = useMemo(() => {
    if (isPending) {
      return createBrowserRouter([
        {
          path: "/",
          element: <Loading />,
        },
      ]);
    }
    if (isAuth) {
      return createBrowserRouter([
        {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Orders />,
      },
         {
        path: "/cars",
        element: <Cars />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/brands",
        element: <Brands />,
      },
        {
        path: "/partners",
        element: <Partners />,
      },
       {
        path: "/auctions",
        element: <Auctions />,
      },
      {
        path: "*",
        element: <Orders />,
      },
    ],
  },
      ]);
    } else {
      return createBrowserRouter([
        {
          path: "/",
          element: <Login />,
        },
        {
          path: "*",
          element: <Error />,
        },
      ]);
    }
  }, [isAuth, isPending]);

  return <RouterProvider router={router} />;
}

export default App;
