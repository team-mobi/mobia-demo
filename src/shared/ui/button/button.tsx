import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { ButtonHTMLAttributes } from "react";
import { useTheme } from "@emotion/react";

type Props = {
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
} & ButtonHTMLAttributes<HTMLButtonElement>;

const getButtonStyles = (
  theme: ReturnType<typeof useTheme>,
  variant: "primary" | "secondary",
  size: "small" | "medium" | "large"
) => {
  const variantStyles = {
    primary: css`
      background-color: ${theme.colors.primary};
      color: ${theme.colors.white};
      border: none;
      &:hover {
        background-color: ${theme.colors.primary};
        opacity: 0.8;
      }
    `,
    secondary: css`
      background-color: ${theme.colors.white};
      color: ${theme.colors.primary};
      border: 1px solid ${theme.colors.primary};
      &:hover {
        background-color: ${theme.colors.primary};
        color: ${theme.colors.white};
      }
    `,
  };

  const sizeStyles = {
    small: css`
      font-size: ${theme.typography.Body3};
      padding: 4px 8px;
    `,
    medium: css`
      font-size: ${theme.typography.Body2};
      padding: 8px 12px;
    `,
    large: css`
      font-size: ${theme.typography.Body1};
      padding: 12px 16px;
    `,
  };

  return css`
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease, opacity 0.3s ease;
    ${variantStyles[variant]}
    ${sizeStyles[size]}
  `;
};

const StyledButton = styled.button<Props>`
  ${({ theme, variant, size }) => {
    return getButtonStyles(theme, variant || "primary", size || "medium");
  }}
`;

const Button: React.FC<Props> = ({
  variant = "primary",
  size = "medium",
  ...props
}) => {
  return <StyledButton variant={variant} size={size} {...props} />;
};

export default Button;
