import { describe, it, expect } from "vitest";
import { delay } from "~shared/lib/helper/promise.helper";

describe("delay function", () => {
  it("should resolve after the specified delay", async () => {
    const start = Date.now();
    const delayMs = 1000;
    await delay(delayMs);
    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(delayMs);
  });
});
