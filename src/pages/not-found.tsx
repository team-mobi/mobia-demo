import { useNavigate } from "react-router-dom";
import { Button, Spacer, Typography } from "~shared/ui";
import Flex from "~shared/ui/flex/flex";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Flex.ColCenter
      css={{
        height: "100vh",
      }}
    >
      <Typography variant={"Heading2"} weight={"bold"}>
        404
      </Typography>
      <Typography variant={"Title1"} weight={"bold"}>
        페이지를 찾을 수 없습니다.
      </Typography>
      <Spacer y={16} />
      <Typography variant={"Body1"}>
        요청하신 페이지가 존재하지 않거나 삭제된 것 같습니다.
      </Typography>
      <Spacer y={8} />
      <Button
        variant={"primary"}
        color="primary"
        size={"large"}
        onClick={() => navigate("/")}
      >
        홈으로 돌아가기
      </Button>
    </Flex.ColCenter>
  );
};

export default NotFoundPage;
