import { useFetchOnePopularPost } from "~entities/post/model/post.model";
import { PostCard } from "~entities/post/ui";
import Flex from "~shared/ui/flex/flex";
import { postEventObserver } from "../model/post.model";

const PopularPostList = () => {
  const { data } = useFetchOnePopularPost();

  const handlePressPopularPostCard = async (postId: string) => {
    postEventObserver.emit("popular-post-click", postId);
  };

  return (
    <Flex.RowCenter
      css={{
        gap: 16,
      }}
    >
      {data.map((post) => (
        <PostCard
          onClick={() => handlePressPopularPostCard(post.id)}
          key={post.id}
          id={post.id}
          title={post.title}
        />
      ))}
    </Flex.RowCenter>
  );
};
export default PopularPostList;
