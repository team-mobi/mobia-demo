import { useNavigate, useRouteError } from "react-router-dom";
import { Button, Spacer, Typography } from "~shared/ui";
import Flex from "~shared/ui/flex/flex";
import * as Sentry from "@sentry/react";

const RootRouteError = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  Sentry.captureException(error, {
    tags: {
      aud: "@mobia",
    },
    extra: {
      email: "user email",
    },
  });

  return (
    <Flex.ColCenter
      css={{
        height: "100vh",
      }}
    >
      <Typography variant={"Heading2"} weight={"bold"}>
        치명적인 오류가 발생했습니다.
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
export default RootRouteError;
