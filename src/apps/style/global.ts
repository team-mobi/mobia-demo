import { css } from "@emotion/react";

const reset = css`
  * {
    box-sizing: border-box;
    font-size: 16px;
    margin: 0;
    padding: 0;
  }

  button:focus-visible {
    outline: none;
  }
`;

const global = css`
  @font-face {
    font-family: "Pretendard Variable";
    src: url("./fonts/pretendard/Pretendard-Bold.woff");
    font-weight: 700;
  }

  @font-face {
    font-family: "Pretendard Variable";
    src: url("./fonts/pretendard/Pretendard-Medium.woff");
    font-weight: 600;
  }

  @font-face {
    font-family: "Pretendard Variable";
    src: url("./fonts/pretendard/Pretendard-Regular.woff");
    font-weight: 400;
  }

  @font-face {
    font-family: "Pretendard Variable";
    src: url("./fonts/pretendard/Pretendard-Light.woff");
    font-weight: 100;
  }

  html {
    font-family: "Pretendard Variable";
  }
`;

export default css`
  ${reset}
  ${global}
`;
