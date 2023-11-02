import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import UserForm from "../pages/UserForm";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/sign-in",
      element: <UserForm />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
