type GNBOption = {
  title: string;
};

type LayoutMetadataMap = {
  [key in string]: {
    showGnb: boolean;
    gnbOption?: GNBOption;
  };
};

export const LAYOUT_METADATA = {
  "/post-list": {
    showGnb: true,
    gnbOption: {
      title: "게시글 목록",
    },
  },
  "/post-list/:id": {
    showGnb: true,
    gnbOption: {
      title: "게시글 상세 보기",
    },
  },
  default: {
    showGnb: false,
  },
} satisfies LayoutMetadataMap;
