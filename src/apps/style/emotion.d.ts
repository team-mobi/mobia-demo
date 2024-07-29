import "@emotion/react";
import theme from "./theme";

type Ttheme = typeof theme;

declare module "@emotion/react" {
  export type Theme = Ttheme;
}
