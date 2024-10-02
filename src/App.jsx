import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Dashboard, Signin } from "@/pages";
import Layout from "./layouts/Layout";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />, // No sidebar for Home
        },
        {
            path: "/signin",
            element: <Signin />, // No sidebar for Signin
        },
        {
            path: "/dashboard",
            element: <Layout />,
            children: [
                {
                    path: "/dashboard",
                    element: <Dashboard />,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
