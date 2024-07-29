import { baseClient } from "../base";
import { FetchOnePostRDO, FetchPostListRDO } from "./model/post.rdo";

const PostApi = () => {
  const http = new baseClient("http:/localhost:8080");

  const fetchPostList = async (signal?: AbortSignal) => {
    return http.get<FetchPostListRDO>("/posts", undefined, {
      signal,
    });
  };

  const fetchOnePost = (postId: string, signal?: AbortSignal) => {
    return http.get<FetchOnePostRDO>(`/posts/${postId}`, undefined, {
      signal,
    });
  };

  const fetchOnePopularPost = async (signal?: AbortSignal) => {
    const response = await http.get<FetchPostListRDO>("/posts", undefined, {
      signal,
    });
    response.sort((a, b) => b.views - a.views);
    const popular_posts = response.slice(0, 2);
    return popular_posts;
  };

  return {
    fetchPostList,
    fetchOnePost,
    fetchOnePopularPost,
  };
};
export default PostApi;
