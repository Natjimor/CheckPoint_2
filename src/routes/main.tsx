import { createBrowserRouter } from "react-router-dom"
import Dashboard from "../screens/dashboard";
import Detail from "../screens/detail";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard/>,
    },
    {
        path: "/cuerpo:id",
        element: <Detail/>,
      },
]);

export default router