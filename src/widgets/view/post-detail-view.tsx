import { useParams } from "react-router-dom";
import CommentItem from "~entities/comment/comment-item";
import { useFetchOnePostList } from "~entities/post/model/post.model";
import PostDetail from "~entities/post/ui/post-detail";
import { BadClientRequest } from "~shared/core/error/app-error";
import { Spacer, Typography } from "~shared/ui";
import Flex from "~shared/ui/flex/flex";

const PostDetailView = () => {
  const params = useParams();
  const { postId } = params;
  if (!postId) throw new BadClientRequest("Incorrect approach");
  const { data } = useFetchOnePostList({
    postId,
  });

  return (
    <Flex.ColCenter
      css={{
        height: "100vh",
      }}
    >
      <PostDetail
        id={data.id}
        views={data.views}
        content={data.content}
        title={data.title}
      />
      <Spacer y={32} />
      <Typography>댓글</Typography>
      {data.comments.map((comment) => (
        <CommentItem key={comment.id} id={comment.id} text={comment.text} />
      ))}
    </Flex.ColCenter>
  );
};
export default PostDetailView;
