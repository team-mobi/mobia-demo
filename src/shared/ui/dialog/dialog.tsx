import { CSSObject } from "@emotion/react";
import React, { PropsWithChildren, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import "./dialog.css";
import { BadClientRequest } from "~shared/core/error/app-error";
import { AnyFunction } from "~shared/types/util-types";

type DiaLogProps = {
  isOpen: boolean;
  style?: CSSObject;
  backdropClose?: boolean;
  backdropCallback?: AnyFunction;
} & React.ComponentPropsWithoutRef<"dialog">;

type Props<T extends React.ElementType> = {
  as?: T;
};

const Root: React.FC<PropsWithChildren> = ({ children }) => {
  const element = document.getElementById("root-dialog");
  if (!element) {
    throw new BadClientRequest("Root element not found");
  }
  return createPortal(children, element);
};

const Dialog = ({
  children,
  isOpen,
  style,
  backdropClose = false,
  backdropCallback,
}: PropsWithChildren<DiaLogProps>) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!dialogRef.current)
      throw new BadClientRequest("Dialog element not found");
    if (isOpen) return dialogRef.current.showModal();
    return dialogRef.current.close();
  }, [isOpen]);

  const handleBackdropClick = async (
    event: React.MouseEvent<HTMLDialogElement, MouseEvent>
  ) => {
    if (!backdropClose) return;
    if (dialogRef.current && event.target === dialogRef.current) {
      dialogRef.current.close();
      await backdropCallback?.();
    }
  };

  return (
    <Root>
      <dialog
        onCancel={async (event) => {
          event.preventDefault();
          backdropCallback?.();
        }}
        ref={dialogRef}
        onClick={handleBackdropClick}
        css={{
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%)`,
          border: "none",
          borderRadius: 8,
          ...style,
          // Padding is included in the closing area
          padding: "0 !important",
        }}
      >
        {children}
      </dialog>
    </Root>
  );
};

const Content = <T extends React.ElementType = "div">({
  as,
  ...props
}: PropsWithChildren<Props<T>> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof Props<T>>) => {
  const Component = as || "div";
  return <Component {...props} />;
};

const Header = <T extends React.ElementType = "div">({
  as,
  ...props
}: PropsWithChildren<Props<T>> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof Props<T>>) => {
  const Component = as || "div";
  return <Component {...props} />;
};
const Footer = <T extends React.ElementType = "div">({
  as,
  ...props
}: PropsWithChildren<Props<T>> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof Props<T>>) => {
  const Component = as || "div";
  return <Component {...props} />;
};

Dialog.Content = Content;
Dialog.Header = Header;
Dialog.Footer = Footer;

export default Dialog;
