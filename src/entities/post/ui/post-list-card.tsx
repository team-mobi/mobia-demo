import { useTheme } from "@emotion/react";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import { Typography } from "~shared/ui";
import Flex from "~shared/ui/flex/flex";

type Props = {
  id: string;
  title: string;
  view: number;
} & ComponentPropsWithoutRef<"div">;

const PostListCard = forwardRef<HTMLDivElement, Props>(
  ({ title, view, ...props }, ref) => {
    const t = useTheme();
    return (
      <Flex.RowBetweenCenter
        {...props}
        ref={ref}
        css={{
          border: `1px solid ${t.colors.gray[4]}`,
          borderRadius: 16,
          width: 320,
          padding: 16,
        }}
      >
        <Typography color={t.colors.primary} weight={"bold"}>
          제목 : {title}
        </Typography>
        <Typography color={t.colors.gray[2]}>조회수 : {view}</Typography>
      </Flex.RowBetweenCenter>
    );
  }
);

export default PostListCard;
