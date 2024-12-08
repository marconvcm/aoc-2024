import { describe, it, expect } from "bun:test";
import { part1, part2 } from ".";

const inputSample = `
....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`.trim();

const part1Output = `41`;
const part2Output = `6`;

describe("06", () => {
   it("should solve part1", () => {
      expect(part1(inputSample)).toBe(part1Output);
   });

   it("should solve part2", () => {
      expect(part2(inputSample)).toBe(part2Output);
   });
});