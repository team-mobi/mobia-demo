import React, { PropsWithChildren } from "react";
import { typography } from "~apps/style/theme";

type Props<T extends React.ElementType> = {
  as?: T;
  variant?: keyof typeof typography;
  color?: string;
  style?: React.CSSProperties;
  weight?: "bold" | "regular";
};

const Typography = <T extends React.ElementType = "div">({
  variant = "Body1",
  color = "#111111",
  as,
  children,
  style,
  weight = "regular",
  ...props
}: PropsWithChildren<Props<T>> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof Props<T>>) => {
  const Component = as || "span";

  return (
    <Component
      css={(theme) => ({
        fontWeight: theme.weight[weight],
        fontSize: theme.typography[variant],
        color,
        ...style,
      })}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Typography;
