import { memo } from "react";
import { Typography } from "~shared/ui";
import Flex from "~shared/ui/flex/flex";

const EmptyPostList: React.FC = () => {
  return (
    <Flex.ColCenter>
      <Typography as={"h1"} weight={"bold"} variant={"Body1"}>
        게시글이 없습니다
      </Typography>
    </Flex.ColCenter>
  );
};
export default memo(EmptyPostList);
