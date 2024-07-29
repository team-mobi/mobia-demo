import { Button, Spacer, Typography } from "~shared/ui";
import Flex from "~shared/ui/flex/flex";
import { useEffect } from "react";
import { delay } from "~shared/lib/helper/promise.helper";
import { MAIN_TEXT_METADATA } from "./config/main.metadata";
import { useRootNavigate } from "~apps/routes";

const MainPage: React.FC = () => {
  const navigate = useRootNavigate();

  useEffect(() => {
    delay(1500).then(() => {
      navigate("/post-list");
    });
  }, [navigate]);

  return (
    <Flex.ColCenter
      css={{
        height: "100vh",
      }}
    >
      <Typography variant={"Title1"} weight={"bold"}>
        {MAIN_TEXT_METADATA.WELCOME_MESSAGE}
      </Typography>
      <Spacer y={8} />
      <Button
        variant={"primary"}
        size={"large"}
        onClick={() => navigate("/post-list")}
      >
        {MAIN_TEXT_METADATA.LIST_NAVIGATE_BUTTON_TEXT}
      </Button>
    </Flex.ColCenter>
  );
};
export default MainPage;
