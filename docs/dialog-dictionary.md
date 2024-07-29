# Dialog Dictionary

> **TLDR**: dialog를 zustand로 생성한 dictionary로 관리하고 이를 조건부 랜더링을 통해 interface를 제공합니다.

## Dialog Model

dialog는 복잡한 컴포넌트의 `client`에서 열고 닫을 수 있어야하고 이벤트성 모달을 위해 `server`에서 보내오는 데이터에 따라 모달을 관리해야할 수도 있습니다. 이렇게 어디서든 데이터를 불러올 수 있는 dialog를 관리하는 중앙 저장소를 생성하고 이를 `key:value`를 통해 관리한다면 우리는 보다 쉽게 dialog를 관리할 수 있을 것입니다.

해당 프로젝트에서는 이를 위해 zustand를 활용하여 [중앙 저장소](/src/widgets/dialog/model/dialog.model.ts)를 생성하고 daiglog를 관리합니다.

```javascript
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
// must delete the key when exiting the dialog.
      const newDialogs = { ...state.dialogs };
      delete newDialogs[key];
      return {
        dialogs: newDialogs,
      };
    }),
}));

export default useDialogStore;


```

## Dialog Provider

[dialog-provider](/src/apps/providers/dialog-provider.tsx)는 상태관리 뿐아니라 `interface의 관리`도 중앙에서 하기위해 생성한 컴포넌트입니다. `type-guard`를 활용하여 타입 안정성을 보장하고 dictionary에 저장된 key에 따라 모달을 관리하고 보여줍니다.

```javascript
const DialogProvider: () => {

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
      })}
      {children}
    </div>
  );
};
export default DialogProvider;
```

## Type Safety

type `Extract`를 활용하여 주어진 type에 따라 어떸 컴포넌트를 보여줄 수 있으지 구분하고 전달해야하는 data를 type safety하게 `set`할 수 있습니다.

```javascript

type DialogData =
  | {
      type: "confirm";
      message: string;
      onConfirm: AnyFunction;
      onCancel: AnyFunction;
    }
  | {
      type: "alert";
      message: string;
      onConfirm: AnyFunction;
    };

dialogs: {
    [K: string]: Extract<DialogData, { type: T }>;
  };

// type safety management
openDialog("add-todo-alert", {
    type: "alert",
    message: "", // type safety
    onConfirm () => {}  // type safety
});


```
