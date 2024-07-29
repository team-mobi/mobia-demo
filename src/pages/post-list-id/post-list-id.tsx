import { Suspense } from "react";
import { ParamsList } from "~apps/routes";
import useTypedParams from "~apps/routes/lib/use-typed-params";
import PostDetailView from "~widgets/view/post-detail-view";

const PostListByPostIdPage = () => {
  const params = useTypedParams<ParamsList>("/post-list/:postId");
  console.log(params.postId); // type safety postId

  return (
    <Suspense fallback={<div>...loading</div>}>
      <PostDetailView />;
    </Suspense>
  );
};
export default PostListByPostIdPage;
