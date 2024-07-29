import { Suspense } from "react";
import ErrorBoundary from "~shared/core/error/error-boundary";
import ErrorFallback from "~shared/core/error/error-fallback";
import { Spacer } from "~shared/ui";
import PostListHeader from "~widgets/header/ui/post.header";
import { PostList } from "~widgets/list/ui";
import PopularPostList from "~widgets/list/ui/popular-post.list";

const PostListPage = () => {
  return (
    <>
      <PostListHeader />
      <Spacer y={16} />
      <Suspense>
        <ErrorBoundary fallback={ErrorFallback}>
          <PopularPostList />
        </ErrorBoundary>
      </Suspense>
      <Spacer y={16} />
      <Suspense fallback={<div>...loading</div>}>
        <ErrorBoundary fallback={ErrorFallback}>
          <PostList />
        </ErrorBoundary>
      </Suspense>
    </>
  );
};

export default PostListPage;
