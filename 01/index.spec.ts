import { describe, it, expect } from "bun:test";
import { part1, part2 } from ".";

const inputSample = `
3   4
4   3
2   5
1   3
3   9
3   3
`.trim();

const part1Output = `11`;
const part2Output = `31`;

describe("01", () => {
   it("should solve part1", () => {
      expect(part1(inputSample)).toBe(part1Output);
   });

   it("should solve part2", () => {
      expect(part2(inputSample)).toBe(part2Output);
   });
});