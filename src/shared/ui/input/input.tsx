import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { InputHTMLAttributes } from "react";
import { useTheme } from "@emotion/react";

type Props = {
  variant?: "underline" | "box";
  inputSize?: "small" | "medium" | "large";
} & InputHTMLAttributes<HTMLInputElement>;

const getInputStyles = (
  theme: ReturnType<typeof useTheme>,
  variant: "underline" | "box",
  inputSize: "small" | "medium" | "large"
) => {
  const variantStyles = {
    underline: css`
      border: none;
      border-bottom: 2px solid #000;
      padding: 8px 0;
      &:focus {
        outline: none;
        border-bottom: 2px solid ${theme.colors.primary};
      }
    `,
    box: css`
      border: 2px solid #000;
      padding: 8px;
      border-radius: 4px;
      &:focus {
        outline: none;
        border-color: ${theme.colors.primary};
      }
    `,
  };

  const sizeStyles = {
    small: css`
      width: 100px;
      height: 24px;
      font-size: ${theme.typography.Body3};
    `,
    medium: css`
      width: 200px;
      height: 32px;
      font-size: ${theme.typography.Body2};
    `,
    large: css`
      width: 300px;
      height: 40px;
      font-size: ${theme.typography.Body1};
    `,
  };

  return css`
    ${variantStyles[variant]}
    ${sizeStyles[inputSize]}
  `;
};

const StyledInput = styled.input<Props>`
  ${({ theme, variant, inputSize }) => {
    return getInputStyles(theme, variant || "underline", inputSize || "medium");
  }}
`;

const Input: React.FC<Props> = ({
  variant = "underline",
  inputSize = "medium",
  ...props
}) => {
  return <StyledInput variant={variant} inputSize={inputSize} {...props} />;
};

export default Input;
