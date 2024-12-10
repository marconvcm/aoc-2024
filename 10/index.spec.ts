import { describe, it, expect } from "bun:test";
import { part1, part2, findAllReachableNines } from ".";

const inputSample = `
89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732
`.trim();

const part1Output = `36`;
const part2Output = ``;

describe("04", () => {
   it("should solve part1", () => {
      expect(part1(inputSample)).toBe(part1Output);
   });

   it("should solve part2", () => {
      expect(part2(inputSample)).toBe(part2Output);
   });
});