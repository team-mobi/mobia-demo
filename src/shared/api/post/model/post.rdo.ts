export type FetchPostListRDO = Array<{
  id: string;
  title: string;
  views: number;
}>;

export type FetchOnePostRDO = {
  id: string;
  title: string;
  views: number;
  content: string;
  comments: Array<{ id: string; text: string }>;
};
