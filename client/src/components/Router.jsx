import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import SignUpForm from "../pages/SignUpForm";
import LogInForm from "../pages/LogInForm";

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
    {
      path: "/log-in",
      element: <LogInForm />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
