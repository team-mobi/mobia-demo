import { Button, Spacer, Typography } from "~shared/ui";
import Flex from "~shared/ui/flex/flex";

type Props = {
  resetErrorBoundary: () => void;
};

const NetWorkErrorFallback: React.FC<Props> = ({ resetErrorBoundary }) => {
  return (
    <Flex.ColCenter>
      <Spacer y={16} />
      <Typography variant={"Body3"}>
        네트워크에 오류가 발생하였습니다. 잠시 후 다시 시도해주세요
      </Typography>
      <Spacer y={8} />
      <Button
        variant={"primary"}
        color="primary"
        size={"large"}
        onClick={resetErrorBoundary}
      >
        재시도
      </Button>
    </Flex.ColCenter>
  );
};
export default NetWorkErrorFallback;
