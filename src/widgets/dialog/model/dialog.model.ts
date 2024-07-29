import { create } from "zustand";
import { AnyFunction } from "~shared/types/util-types";

export const DIALOG_TYPE = {
  CONFIRM: "CONFIRM",
  ALERT: "ALERT",
  WRITE_TODO: "WRITE_TODO",
} as const;

type DialogType = keyof typeof DIALOG_TYPE;

type DialogData =
  | {
      type: typeof DIALOG_TYPE.CONFIRM;
      message: string;
      onConfirm?: AnyFunction;
      onCancel?: AnyFunction;
    }
  | {
      type: typeof DIALOG_TYPE.ALERT;
      message: string;
      onConfirm?: AnyFunction;
    }
  | {
      type: typeof DIALOG_TYPE.WRITE_TODO;
    };

export type DialogState<T extends DialogType> = {
  dialogs: {
    [K: string]: Extract<DialogData, { type: T }>;
  };
  openDialog: (key: string, data: Extract<DialogData, { type: T }>) => void;
  closeDialog: (key: string) => void;
};

const useDialogStore = create<{
  dialogs: {
    [key: string]: DialogData;
  };
  openDialog: (key: string, data: DialogData) => void;
  closeDialog: (key: string) => void;
}>((set) => ({
  dialogs: {},
  openDialog: (key, data) =>
    set((state) => ({
      dialogs: {
        ...state.dialogs,
        [key]: { ...data },
      },
    })),
  closeDialog: (key) =>
    set((state) => {
      const newDialogs = { ...state.dialogs };
      delete newDialogs[key];
      return {
        dialogs: newDialogs,
      };
    }),
}));

export default useDialogStore;
