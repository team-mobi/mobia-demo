import { createBrowserRouter } from "react-router-dom";
import RootRouteError from "./ui/route-root-error";
import NotFoundPage from "~pages/not-found";
import MBALayOut from "~apps/layout";
import PublicRoute from "./config/public.route";
import AuthRoute from "./config/auth.route";
import { useTypedNavigate } from "./lib/use-typed-route";

export const router = createBrowserRouter([
  {
    element: <MBALayOut />,
    errorElement: <RootRouteError />,
    children: [
      ...PublicRoute,
      ...AuthRoute,
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export type ParamsList = {
  "/post-list": {
    params: { postId?: string };
  };
  "/post-list/:postId": {
    segments: { postId?: string };
  };
};

export const useRootNavigate = () => useTypedNavigate<ParamsList>();
