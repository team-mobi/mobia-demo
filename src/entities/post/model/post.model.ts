import { POST_QUERY_KEY } from "../config/post.metadata";
import { useSuspenseQuery } from "@tanstack/react-query";
import PostApi from "~shared/api/post";

export const useFetchPostList = () => {
  const postApi = PostApi();

  return useSuspenseQuery({
    queryKey: [POST_QUERY_KEY.FETCH_POST_LIST],
    queryFn: ({ signal }) => postApi.fetchPostList(signal),
  });
};

export const useFetchOnePostList = ({ postId }: { postId: string }) => {
  const postApi = PostApi();

  return useSuspenseQuery({
    queryKey: [POST_QUERY_KEY.FETCH_ONE_POST],
    queryFn: ({ signal }) => postApi.fetchOnePost(postId, signal),
  });
};

export const useFetchOnePopularPost = () => {
  const postApi = PostApi();

  return useSuspenseQuery({
    queryKey: [POST_QUERY_KEY.FETCH_ONE_POPULAR_POST],
    queryFn: ({ signal }) => postApi.fetchOnePopularPost(signal),
  });
};
