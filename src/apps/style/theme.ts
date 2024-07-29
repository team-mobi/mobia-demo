export const colors = {
  primary: "#5BD2C4",
  secondary: "#212D4E",
  white: "#FFFFFF",
  black: "#191919",
  red: "#F03838",
  green: "#195040",
  green_gray: "#F1FBF8",
  gray: {
    1: "#545454",
    2: "#777777",
    3: "#999999",
    4: "#DDDDDD",
    5: "#EEEEEE",
    6: "#F9F9F9",
  },
} as const;

export const typography = {
  Heading1: 64,
  Heading2: 48,
  Heading3: 36,
  Title1: 24,
  Title2: 20,
  Title3: 18,
  Body1: 16,
  Body2: 14,
  Body3: 12,
} as const;

export const weight = {
  bold: 700,
  regular: 400,
  thin: 100,
};

export default {
  colors,
  typography,
  weight,
};
