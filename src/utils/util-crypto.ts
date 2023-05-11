import { createHash } from "crypto";

/**
 * Hash content using sha256
 * @param input Content to be hashed
 * @returns Hashed content in hex format
 */
export const hash = (input: string) => {
  const hash = createHash("sha256").update(input).digest("hex");
  return hash;
};
