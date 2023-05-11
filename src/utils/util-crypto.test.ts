import { hash } from "./util-crypto.js";

describe("crypto", () => {
  it("should return proper hash", () => {
    const input = "hello world";
    const output =
      "b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9";
    const result = hash(input);
    expect(result).toBe(output);
  });
});
