import { describe, it, expect } from "bun:test";
import { part1, part2 } from ".";

const inputSample = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`.trim();
const inputSample2 = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`.trim();
const inputSample3 = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))mul(10,20)`.trim();

const part1Output = `161`;
const part2Output = `48`;

describe("03", () => {
   it("should solve part1", () => {
      expect(part1(inputSample)).toBe(part1Output);
   });

   it("should solve part2", () => {
      expect(part2(inputSample2)).toBe(part2Output);
   });
   
   it("should solve sample3", () => {
      expect(part2(inputSample3)).toBe('248');
   });
});