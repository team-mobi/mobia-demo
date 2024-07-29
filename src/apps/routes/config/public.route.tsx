import { RouteObject } from "react-router-dom";
import MainPage from "~pages/main/main";
import PostListByPostIdPage from "~pages/post-list-id/post-list-id";
import PostListPage from "~pages/post-list/post-list";

const PublicRoute: RouteObject[] = [
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/post-list",
    element: <PostListPage />,
  },
  {
    path: "/post-list/:postId",
    element: <PostListByPostIdPage />,
  },
];
export default PublicRoute;
