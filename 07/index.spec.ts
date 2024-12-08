import { describe, it, expect } from "bun:test";
import { part1, part2, canProduceTarget } from ".";

const inputSample = `
190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`.trim();

const part1Output = `3749`;
const part2Output = `11387`;

describe("04", () => {
   it("should solve part1", () => {
      expect(part1(inputSample)).toBe(part1Output);
   });

   it("should solve part2", () => {
      expect(part2(inputSample)).toBe(part2Output);
   });

   it("canProduceTarget", () => {  
      expect(canProduceTarget([10, 19], 190)).toBe(true);
      expect(canProduceTarget([17, 5], 83)).toBe(false);
      expect(canProduceTarget([16, 10, 13], 161011)).toBe(false);
   });
});