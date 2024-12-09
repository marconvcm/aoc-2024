import { describe, it, expect } from "bun:test";
import { part1, part2 } from ".";

const inputSample = `2333133121414131402`.trim();

const part1Output = `1928`;
const part2Output = `2858`;

describe("09", () => {
   it("should solve part1", () => {
      expect(part1(inputSample)).toBe(part1Output);
   });

   it("should solve part2", () => {
      expect(part2(inputSample)).toBe(part2Output);
   });
});