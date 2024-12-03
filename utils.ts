import fs from "fs";

export function readInput(day: string): string {
   return fs.readFileSync(`${day}/input.txt`, "utf-8");
}

export function readMatrix(input: string): number[][] {
   return input.split("\n").map(row => row.split(" ").map(Number));
}
