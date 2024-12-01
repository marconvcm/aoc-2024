import fs from "fs";

export function readInput(day: string): string {
   return fs.readFileSync(`${day}/input.txt`, "utf-8");
}