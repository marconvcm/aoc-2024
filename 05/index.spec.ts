import { describe, it, expect } from "bun:test";
import { part1, part2, parseInput, reduce, isPristineOrder, findMiddlePoint, adjustPrintOrder } from ".";

const inputSample = `
47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`.trim();

const part1Output = `143`;
const part2Output = ``;

describe("04", () => {
   it("should solve part1", () => {
      expect(part1(inputSample)).toBe(part1Output);
   });

   it("should solve part2", () => {
      expect(part2(inputSample)).toBe(part2Output);
   });

   it("reduce", () => {
      const { rules, pages } = parseInput(inputSample);
      const reducedRules = reduce(rules);
      expect(reducedRules).toEqual({
         13: [97, 61, 29, 47, 75, 53],
         29: [75, 97, 53, 61, 47],
         47: [97, 75],
         53: [47, 75, 61, 97],
         61: [97, 47, 75],
         75: [97],
      });
   });

   it("isPristineOrder", () => {
      const { rules, pages } = parseInput(inputSample);

      const reducedRules = reduce(rules);
      console.log(reducedRules);
      expect(isPristineOrder(reducedRules, pages[0])).toBe(true);
      expect(isPristineOrder(reducedRules, pages[1])).toBe(true);
      expect(isPristineOrder(reducedRules, pages[2])).toBe(true);
      expect(isPristineOrder(reducedRules, pages[3])).toBe(false);
      expect(isPristineOrder(reducedRules, pages[4])).toBe(false);
      expect(isPristineOrder(reducedRules, pages[5])).toBe(false);
   });

   it("findMiddlePoint", () => {
      expect(findMiddlePoint([1, 2, 3, 4, 5])).toBe(3);
      expect(findMiddlePoint([1, 2, 3, 4, 5, 6])).toBe(4);
   });

   it("adjustPrintOrder", () => {
      const { rules, pages } = parseInput(inputSample);
      const reducedRules = reduce(rules);
      
      expect(isPristineOrder(reducedRules, adjustPrintOrder(reducedRules, pages[3]))).toBe(true);
      expect(isPristineOrder(reducedRules, adjustPrintOrder(reducedRules, pages[4]))).toBe(true);
      expect(isPristineOrder(reducedRules, adjustPrintOrder(reducedRules, pages[5]))).toBe(true);
   });
});