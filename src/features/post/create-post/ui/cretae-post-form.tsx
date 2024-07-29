import { FormEvent } from "react";
import { AnyFunction } from "~shared/types/util-types";
import { Button, Spacer } from "~shared/ui";
import { Box } from "~shared/ui/box/box";
import Flex from "~shared/ui/flex/flex";
import Input from "~shared/ui/input/input";

type Props = {
  onSuccess?: AnyFunction;
  onFailure?: AnyFunction;
};

const CreatePostForm: React.FC<Props> = ({ onSuccess, onFailure }) => {
  const handlePressWritPostSubmit = (e: FormEvent) => {
    e.preventDefault();
    try {
      onSuccess?.();
    } catch (err) {
      onFailure?.(err);
    }
  };

  return (
    <form onSubmit={handlePressWritPostSubmit}>
      <Box>
        <Input variant="box" />
      </Box>
      <Spacer y={16} />
      <Box>
        <Input variant="box" />
      </Box>
      <Spacer y={32} />
      <Flex.ColCenterEnd>
        <Button variant={"primary"} size={"medium"}>
          추가
        </Button>
      </Flex.ColCenterEnd>
    </form>
  );
};
export default CreatePostForm;
