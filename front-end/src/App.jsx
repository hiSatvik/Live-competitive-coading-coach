import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PlayGround from "./pages/playground/playground";

export default function Playground() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <PlayGround/>
        }
    ])
    return (
        <RouterProvider router={router}/>
    )
}