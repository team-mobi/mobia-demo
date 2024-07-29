import { PropsWithChildren } from "react";
import useDialogStore from "~widgets/dialog/model/dialog.model";
import { WritePostDialog } from "~widgets/dialog/ui";
import AlertDialog from "~widgets/dialog/ui/alert.dialog";
import ConfirmDialog from "~widgets/dialog/ui/confirm.dialog";

const DialogProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const dialogs = useDialogStore((s) => s.dialogs);

  return (
    <div>
      {Object.entries(dialogs).map(([key, data]) => {
        if (data.type === "ALERT") {
          return (
            <AlertDialog
              key={key}
              message={data.message}
              onConfirm={data.onConfirm}
              dialogKey={key}
            />
          );
        }

        if (data.type === "CONFIRM") {
          return (
            <ConfirmDialog
              key={key}
              message={data.message}
              onConfirm={data.onConfirm}
              dialogKey={key}
              onCancel={data.onCancel}
            />
          );
        }

        if (data.type === "WRITE_TODO") {
          return <WritePostDialog key={key} dialogKey={key} />;
        }
      })}
      {children}
    </div>
  );
};
export default DialogProvider;
