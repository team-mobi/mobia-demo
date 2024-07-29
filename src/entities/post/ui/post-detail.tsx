import { Spacer, Typography } from "~shared/ui";
import Flex from "~shared/ui/flex/flex";

type Props = {
  id: string;
  views: number;
  content: string;
  title: string;
};

const PostDetail: React.FC<Props> = ({ views, content, title }) => {
  return (
    <Flex.ColCenter>
      <Typography weight={"bold"} variant={"Heading3"}>
        {title}
      </Typography>
      <Spacer y={16} />
      <Typography>{content}</Typography>
      <Spacer y={16} />
      <Typography>{views}</Typography>
    </Flex.ColCenter>
  );
};
export default PostDetail;
