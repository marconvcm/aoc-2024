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

export function isSafeReportLine(reportLine: number[]): boolean {

   if (isSafeReport(reportLine)) {
      return true;
   }

   for (let i = 0; i < reportLine.length; i++) {
      const newReportLine = [...reportLine];
      newReportLine.splice(i, 1);
      if (isSafeReport(newReportLine)) {
         return true;
      }
   }

   return false;
}

export function part1(input: string): string {
   let matrix = readMatrix(input);
   let safeReports = matrix.filter(isSafeReport);
   return `${safeReports.length}`;
}

export function part2(input: string): string {
   let matrix = readMatrix(input);
   let safeReports = matrix.filter(isSafeReportLine);
   return `${safeReports.length}`;
}