import { describe, it, expect, vi } from "vitest";
import { raceWithTimeout } from "~/shared/lib/helper/promise.helper";

describe("raceWithTimeout function", () => {
  it("should call onTimeout callback when timeout occurs", async () => {
    const onTimeout = vi.fn();
    const promise = new Promise<never>(() => {});
    try {
      await raceWithTimeout(promise, 1000, onTimeout);
    } catch {
      // Timeout expected
    }
    expect(onTimeout).toHaveBeenCalled();
  });
});
