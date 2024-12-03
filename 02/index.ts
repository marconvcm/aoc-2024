import { readMatrix } from "../utils";

function isSafeReport(report: number[]): boolean {

   let increasing = true;
   let decreasing = true;

   for (let i = 1; i < report.length; i++) {
      if (report[i] > report[i - 1]) {
         decreasing = false;
      } else if (report[i] < report[i - 1]) {
         increasing = false;
      }
      if (report[i] === report[i - 1]) {
         return false;
      }
   }

   if (increasing && decreasing) {
      return false;
   }

   if (increasing || decreasing) {
      for (let i = 1; i < report.length; i++) {
         if (Math.abs(report[i] - report[i - 1]) > 3) {
            return false;
         }
      }
      return true
   }

   return false;
}


function adjacentPairs(data: number[]): number[][] {
   return data.slice(0, -1).map((value, index) => [value, data[index + 1]]);
}

function isSafeReport2(reportSheet: number[]): boolean {

   if (isSafeReport(reportSheet)) {
      return true;
   }

   const pairs = adjacentPairs(reportSheet);

   const firstNonInc = pairs.findIndex(([a, b]) => !diffOk(a, b, 1));
   const firstNonDec = pairs.findIndex(([a, b]) => !diffOk(a, b, -1));

   const checks = [firstNonInc, firstNonDec].filter((index) => index !== -1);

   for (const check of checks) {
       for (const index of [check, check + 1]) {
           if (index < 0 || index >= reportSheet.length) continue;
           const newData = [...reportSheet];
           newData.splice(index, 1);
           const newReport = newData
           if (isSafeReport(newReport)) {
               return true;
           }
       }
   }

   return false;
}

export function diffOk(a: number, b: number, expectedSign: number): boolean {
   const diff = a - b;
   return Math.sign(diff) === expectedSign && Math.abs(diff) >= 1 && Math.abs(diff) <= 3;
}

export function part1(input: string): string {
   let matrix = readMatrix(input);
   let safeReports = matrix.filter(isSafeReport);
   return `${safeReports.length}`;
}

export function part2(input: string): string {
   let matrix = readMatrix(input);
   let safeReports = matrix.filter(isSafeReport2);
   return `${safeReports.length}`;
}