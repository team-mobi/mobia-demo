import { CSSObject } from "@emotion/react";
import { Button, Dialog, Spacer } from "~shared/ui";
import useDialogStore from "../model/dialog.model";
import { AnyFunction } from "~shared/types/util-types";
import { Box } from "~shared/ui/box/box";

type ConfirmProps = {
  dialogKey: string;
  message: string;
  onConfirm?: AnyFunction;
  onCancel?: AnyFunction;
};

const ConfirmDialog = ({
  dialogKey,
  message,
  onConfirm,
  onCancel,
}: ConfirmProps) => {
  const closeDialog = useDialogStore((s) => s.closeDialog);

  return (
    <Dialog isOpen css={confirmDialogStyle}>
      <Box padding={[32]}>
        <Dialog.Content css={contentStyle}>{message}</Dialog.Content>
        <Dialog.Footer css={footerStyle}>
          <Button
            variant={"secondary"}
            size={"large"}
            onClick={async () => {
              await onCancel?.();
              closeDialog(dialogKey);
            }}
          >
            취소
          </Button>
          <Spacer x={8} />
          <Button
            onClick={async () => {
              await onConfirm?.();
              closeDialog(dialogKey);
            }}
            variant={"primary"}
            size={"large"}
          >
            확인
          </Button>
        </Dialog.Footer>
      </Box>
    </Dialog>
  );
};

export default ConfirmDialog;

const confirmDialogStyle: CSSObject = {
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
