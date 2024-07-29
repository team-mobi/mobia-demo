import { Outlet, useLocation } from "react-router-dom";

import { LAYOUT_METADATA } from "./config/layout.metadata";
import styled from "@emotion/styled";
import MBAGnbLayout from "./ui/mobia.gnb";

const Inner = styled("div")`
  max-width: 420px;
  margin: 0 auto;
`;

const MBALayOut = () => {
  const getMetadata = (path: string) => {
    const cleanedPath = path.endsWith("/") ? path.slice(0, -1) : path;
    const pathPatterns = Object.keys(LAYOUT_METADATA);
    for (const pattern of pathPatterns) {
      const regexPattern = pattern
        .replace(/:[^\s/]+/g, "([^/]+)")
        .replace(/\//g, "\\/");

      const regex = new RegExp(`^${regexPattern}$`);
      if (regex.test(cleanedPath)) {
        return LAYOUT_METADATA[pattern as keyof typeof LAYOUT_METADATA];
      }
    }
    return LAYOUT_METADATA["default"];
  };

  const location = useLocation();
  const path = location.pathname;
  const metadata = getMetadata(path);

  return (
    <>
      {metadata.showGnb && <MBAGnbLayout title={metadata.gnbOption.title} />}
      <Inner>
        <Outlet />
      </Inner>
    </>
  );
};
export default MBALayOut;
