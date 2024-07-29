import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { act, render, screen, waitFor } from "@testing-library/react";
import { router } from "~/apps/routes";
import App from "~/apps/app";
import { POST_LIST_MOCK } from "../../__mock__/data/post/post-list.mock";
import { noop } from "~/shared/lib/helper/function.helper";

vi.mock("~/entities/post/model/post.model", () => ({
  useFetchPostList: vi.fn().mockImplementation(() => ({
    isLoading: true,
    data: POST_LIST_MOCK,
  })),
  useFetchOnePopularPost: vi.fn().mockImplementation(() => ({
    isLoading: true,
    data: POST_LIST_MOCK,
  })),
}));

describe("create post scenario", () => {
  beforeAll(() => {
    document.body.innerHTML = `
    <div id="root"></div>
    <div id="root-dialog"></div>
  `;
  });

  afterAll(async () => {
    vi.clearAllMocks();
  });

  it("render post list", async () => {
    act(() => {
      render(<App />);
      router.navigate("/post-list");
    });
    await waitFor(() => noop());
    screen.debug();
    const postElement = screen.queryAllByText(/첫\s*번째\s*포스트/i);
    // '첫 번째 포스트' is just an example, replace it with the exact unique text you expect.

    expect(postElement[0]).toBeInTheDocument();
  });
});
