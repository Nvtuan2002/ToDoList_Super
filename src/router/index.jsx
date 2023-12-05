import {
    createBrowserRouter,
} from "react-router-dom";
import BaseLayout from "@/components/Layout/BaseLayout";
import ErrorPage from "@/pages/ErrorPage";
import Home from "@/pages/Home";
import Register from "@/pages/Register";
import Login from "@/pages/Login";
import PrivateRouter from "./PrivateRouter";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <BaseLayout></BaseLayout>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <PrivateRouter role="AuthenticateCheck">
                    <Home />
                </PrivateRouter>
            },
            {
                path: '/admin',
                element: <PrivateRouter role="ManagerCheck">
                    <h1>Admin</h1>
                </PrivateRouter>
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/login',
                element: <Login />
            },
        ]
    },
]);