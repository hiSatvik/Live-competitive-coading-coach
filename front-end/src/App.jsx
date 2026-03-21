import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PlayGround from "./pages/playground/playground";
import Forms from "./pages/auth/forms";

export default function Playground() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <PlayGround/>
        },
        {
            path: "/signup",
            element: <Forms defaultLogin={false}/>
        },
        {
            path: "/login",
            element: <Forms defaultLogin={true}/>
        }
    ])
    return (
        <RouterProvider router={router}/>
    )
}