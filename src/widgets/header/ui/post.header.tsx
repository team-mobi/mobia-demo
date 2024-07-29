import { Button } from "~shared/ui";
import { Box } from "~shared/ui/box/box";
import Flex from "~shared/ui/flex/flex";
import useDialogStore from "~widgets/dialog/model/dialog.model";

const PostListHeader = () => {
  const openDialog = useDialogStore((s) => s.openDialog);
  const handlePressWritePostModal = () => {
    openDialog("write-post-list", {
      type: "WRITE_TODO",
    });
  };

  return (
    <Box padding={[0, 16, 0, 0]}>
      <Flex.ColCenterEnd>
        <Button
          onClick={handlePressWritePostModal}
          variant={"primary"}
          size={"medium"}
        >
          추가
        </Button>
      </Flex.ColCenterEnd>
    </Box>
  );
};
export default PostListHeader;
