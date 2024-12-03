import { describe, it, expect } from "bun:test";
import { part1, part2 } from ".";

const inputSample = `
7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9
`.trim();

const part1Output = `2`;
const part2Output = `4`;

describe("02", () => {
   it("should solve part1", () => {
      expect(part1(inputSample)).toBe(part1Output);
   });

   it("should solve part2", () => {
      expect(part2(inputSample)).toBe(part2Output);
   });
});