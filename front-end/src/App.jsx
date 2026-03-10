import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProblemPanel from "./pages/playground/Components/ProblemPanel";

export default function Playground() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <ProblemPanel/>
        }
    ])
    return (
        <RouterProvider router={router}/>
    )
}