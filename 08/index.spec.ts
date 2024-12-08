import { describe, it, expect } from "bun:test";
import { part1, part2, findAntennas, getMap, inferNodePoint, inferNodes, displayUpdatedMap } from ".";

const inputSample = `
............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`.trim();

const part1Output = `14`;
const part2Output = `34`;

describe("08", () => {
   it("should solve part1", () => {
      expect(part1(inputSample)).toBe(part1Output);
   });

   it("should solve part2", () => {
      expect(part2(inputSample)).toBe(part2Output);
   });

   it("findAntennas", () => {
      const map = getMap(inputSample);
      const antennas = findAntennas(map);
      expect(antennas).toEqual({
         "A": [{ x: 6, y: 5 }, { x: 8, y: 8 }, { x: 9, y: 9 }],
         "0": [{ x: 8, y: 1 }, { x: 5, y: 2 }, { x: 7, y: 3 }, { x: 4, y: 4 }],
      });
   });

   it("inferNodePoint", () => {
      const map = getMap(inputSample);
      const origin = { x: 6, y: 5 };
      let delta = { x: 1, y: 0 };
      expect(inferNodePoint(map, origin, delta)).toEqual({ x: 7, y: 5 });
      delta = { x: -100, y: 0 };
      expect(inferNodePoint(map, origin, delta)).toEqual(null);
      delta = { x: -6, y: -5 };
      expect(inferNodePoint(map, origin, delta)).toEqual({ x: 0, y: 0 });
   });

   it("inferNodes", () => {
      const map = getMap(inputSample);
      const antennas = findAntennas(map);
      const nodes = inferNodes(map, antennas);
      expect(nodes).toEqual([
         {
            x: 11,
            y: 0,
         }, {
            x: 2,
            y: 3,
         }, {
            x: 3,
            y: 1,
         }, {
            x: 6,
            y: 0,
         }, {
            x: 6,
            y: 5,
         }, {
            x: 9,
            y: 4,
         }, {
            x: 10,
            y: 2,
         }, {
            x: 0,
            y: 7,
         }, {
            x: 3,
            y: 6,
         }, {
            x: 1,
            y: 5,
         }, {
            x: 4,
            y: 2,
         }, {
            x: 10,
            y: 11,
         }, {
            x: 7,
            y: 7,
         }, {
            x: 10,
            y: 10,
         }
      ]);
   });
});