import { useRootNavigate } from "~apps/routes";
import { useFetchPostList } from "~entities/post/model/post.model";
import { PostListCard } from "~entities/post/ui";
import { useEvent } from "~shared/lib/hooks/use-event";
import Flex from "~shared/ui/flex/flex";
import useDialogStore from "~widgets/dialog/model/dialog.model";
import { postEventObserver } from "../model/post.model";
import { useEffect, useRef } from "react";
import { useTheme } from "@emotion/react";
import { Box } from "~shared/ui/box/box";
import { Effect } from "effect";
import { BadClientRequest } from "~shared/core/error/app-error";
import { noop } from "~shared/lib/helper/function.helper";

const PostList = () => {
  const { data, isLoading } = useFetchPostList();
  const t = useTheme();

  const navigate = useRootNavigate();
  const openDialog = useDialogStore((s) => s.openDialog);
  const postRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const postElementScrollDown = (
    postId: string
  ): Effect.Effect<void, BadClientRequest> => {
    if (isLoading) {
      return Effect.fail(new BadClientRequest("Request is currently loading"));
    }
    const postElement = postRefs.current[postId];
    if (!postElement)
      return Effect.fail(new BadClientRequest("Post element not found"));

    postElement.scrollIntoView({ behavior: "smooth" });
    return noop();
  };

  const onInit = useEvent(() => {
    const removeListener = postEventObserver.addListenerRemovable(
      "popular-post-click",
      async (id: string) => {
        Effect.runPromise(postElementScrollDown(id));
      }
    );
    return removeListener;
  });

  useEffect(() => {
    const removeListener = onInit();
    return () => {
      removeListener();
    };
  }, [onInit]);

  const handlePressPostCard = (postId: string) => {
    openDialog("confirm", {
      type: "CONFIRM",
      message: "포스트 상세 페이지로 이동합니다.",
      onConfirm: () => {
        navigate("/post-list/:postId", {
          segments: {
            postId: postId,
          },
        });
      },
    });
  };

  return (
    <Box
      padding={[16]}
      css={{
        border: `1px solid ${t.colors.gray[3]}`,
        borderRadius: 8,
      }}
    >
      <Flex.ColCenter
        css={{
          gap: 8,
        }}
      >
        {data.map((post) => (
          <PostListCard
            ref={(el) => (postRefs.current[post.id] = el)}
            key={post.id}
            onClick={() => handlePressPostCard(post.id)}
            id={post.id}
            title={post.title}
            view={post.views}
            css={{
              cursor: "pointer",
            }}
          />
        ))}
      </Flex.ColCenter>
    </Box>
  );
};
export default PostList;
