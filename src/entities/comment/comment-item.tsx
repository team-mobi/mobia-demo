import { Typography } from "~shared/ui";
import Flex from "~shared/ui/flex/flex";

type Props = {
  id: string;
  text: string;
};

const CommentItem: React.FC<Props> = ({ text }) => {
  return (
    <Flex.ColCenter>
      <Typography>{text}</Typography>
    </Flex.ColCenter>
  );
};
export default CommentItem;
