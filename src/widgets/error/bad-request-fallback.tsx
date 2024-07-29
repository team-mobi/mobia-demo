import { Spacer, Typography } from "~shared/ui";
import Flex from "~shared/ui/flex/flex";

const BadRequestErrorFallback: React.FC = () => {
  return (
    <div>
      <Flex.ColCenter>
        <Spacer y={16} />
        <Typography variant={"Body3"}>잘못된 접근입니다.</Typography>
        <Spacer y={8} />
      </Flex.ColCenter>
    </div>
  );
};
export default BadRequestErrorFallback;
