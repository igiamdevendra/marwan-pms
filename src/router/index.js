import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout"
import Dashboard from "../components/Dashboard";
import Enquiry from "../components/Enquiry";
import Proposal from "../components/Proposal";
import Master from "../components/Master";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: Layout,
        children: [
           {
            path: "/dashboard",
            Component: Dashboard
           },
           {
            path: "/enquiry",
            Component: Enquiry
           },
           {
            path: "/proposal",
            Component: Proposal
           },
           {
            path: "/master",
            Component: Master
           }
        ]
    }
])