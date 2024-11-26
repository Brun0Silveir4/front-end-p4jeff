import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import SpecificItem from "./pages/SpecificItem/Index";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/specificDay/:day/:month/:year',
        element: <SpecificItem />
    }
])

export default router