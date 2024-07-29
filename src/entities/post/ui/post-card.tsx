import { useTheme } from "@emotion/react";
import { ComponentPropsWithoutRef } from "react";
import { Typography } from "~shared/ui";
import Flex from "~shared/ui/flex/flex";

type Props = {
  id: string;
  title: string;
} & ComponentPropsWithoutRef<"div">;

const PostCard: React.FC<Props> = ({ title, ...props }) => {
  const t = useTheme();
  return (
    <Flex.ColCenter
      {...props}
      css={{
        border: `1px solid ${t.colors.primary}`,
        borderRadius: 8,
        width: "50%",
        padding: 8,
        cursor: "pointer",
        "&:hover": {
          transform: "scale(1.1)",
        },
      }}
    >
      <Typography variant={"Body2"} weight={"bold"}>
        {title}
      </Typography>
    </Flex.ColCenter>
  );
};
export default PostCard;
