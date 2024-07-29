import { Dialog, Spacer, Typography } from "~shared/ui";
import useDialogStore from "../model/dialog.model";
import { Box } from "~shared/ui/box/box";
import CreatePostForm from "~features/post/create-post/ui/cretae-post-form";

type Props = {
  dialogKey: string;
};

const WritePostDialog: React.FC<Props> = ({ dialogKey }) => {
  const closeDialog = useDialogStore((s) => s.closeDialog);
  const openDialog = useDialogStore((s) => s.openDialog);

  return (
    <Dialog isOpen>
      <Box padding={[32]}>
        <Dialog.Header>
          <Typography variant="Heading3" weight="bold">
            게시글 작성
          </Typography>
        </Dialog.Header>
        <Spacer y={32} />
        <Dialog.Content>
          <CreatePostForm
            onSuccess={() => {
              openDialog("write-success", {
                type: "ALERT",
                message: "게시글이 등록되었습니다",
                onConfirm: () => {
                  closeDialog(dialogKey);
                },
              });
            }}
          />
        </Dialog.Content>
      </Box>
    </Dialog>
  );
};
export default WritePostDialog;
