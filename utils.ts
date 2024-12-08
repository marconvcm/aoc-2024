import fs from "fs";

export function readInput(day: string): string {
   return fs.readFileSync(`${day}/input.txt`, "utf-8");
}

export function readMatrix(input: string): number[][] {
   return input.split("\n").map(row => row.split(" ").map(Number));
}

export function add(x: number, y: number): number {
   return x + y;
}

export function sum(arr: number[]): number {
   return arr.reduce(add, 0);
}

export function insertAt(arr: number[], index: number, value: number): number[] {
   return [...arr.slice(0, index), value, ...arr.slice(index)];
}
