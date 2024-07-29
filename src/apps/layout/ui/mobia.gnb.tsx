import { useTheme } from "@emotion/react";
import React from "react";
import { Typography } from "~shared/ui";
import { Box } from "~shared/ui/box/box";
import Flex from "~shared/ui/flex/flex";

type Props = {
  title: string;
};

const MBAGnbLayout: React.FC<Props> = ({ title }) => {
  const t = useTheme();

  return (
    <Flex.ColCenter>
      <Box padding={[16]}>
        <Typography weight={"bold"} variant={"Title3"} color={t.colors.primary}>
          {title}
        </Typography>
      </Box>
    </Flex.ColCenter>
  );
};

export default MBAGnbLayout;
