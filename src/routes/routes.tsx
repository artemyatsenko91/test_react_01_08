import { Outlet } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { HomePage } from "../pages/HomePage";
import { ContactPage } from "../pages/ContactPage";


const routes = [
  {
    path: "/",
    element: <Outlet />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: ROUTES.CONTACT_DETAIL, element: <ContactPage /> },
    ],
  },
];

export default routes;
