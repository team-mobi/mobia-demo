import { CSSObject } from "@emotion/react";
import { Button, Dialog } from "~shared/ui";
import useDialogStore from "../model/dialog.model";
import { AnyFunction } from "~shared/types/util-types";
import { Box } from "~shared/ui/box/box";

type AlertProps = {
  dialogKey: string;
  message: string;
  onConfirm?: AnyFunction;
};

const Alert = ({ dialogKey, message, onConfirm }: AlertProps) => {
  const closeDialog = useDialogStore((s) => s.closeDialog);

  return (
    <Dialog isOpen css={alertDialogStyle}>
      <Box padding={[32]}>
        <Dialog.Content css={contentStyle}>{message}</Dialog.Content>
        <Dialog.Footer css={footerStyle}>
          <Button
            variant={"primary"}
            size={"large"}
            onClick={async () => {
              await onConfirm?.();
              closeDialog(dialogKey);
            }}
          >
            확인
          </Button>
        </Dialog.Footer>
      </Box>
    </Dialog>
  );
};

export default Alert;

const alertDialogStyle: CSSObject = {
  width: "400px",
  padding: "20px",
  backgroundColor: "#fff",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
};

const contentStyle: CSSObject = {
  fontSize: "16px",
  marginBottom: "20px",
};

const footerStyle: CSSObject = {
  display: "flex",
  justifyContent: "flex-end",
};
