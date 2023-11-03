import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import SignUpForm from "../pages/SignUpForm";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/sign-in",
      element: <SignUpForm />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
