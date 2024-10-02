import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Dashboard, Signin } from "@/pages";
function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/dashboard",
            element: <Dashboard />,
        },
        {
            path: "/signin",
            element: <Signin />,
        },
    ]);
    return (
        <div className="flex min-h-screen  max-w-screen overflow-x-hidden ">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
