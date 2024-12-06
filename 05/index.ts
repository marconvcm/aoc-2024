import { sum } from "../utils";

export function parseInput(input: string): { rules: string[], pages: number[][] } {
   const [rules, pages] = input.split("\n\n");
   return {
      rules: rules.split("\n"),
      pages: pages.split("\n").map(line => line.split(",").map(Number))
   }
}

export function reduce(rules: string[]): Record<number, number[]> {
   return rules.reduce((acc, rule) => {
      const [value, key] = rule.split("|").map(Number);
      if (acc[key]) {
         acc[key].push(value);
      } else {
         acc[key] = [value];
      }
      return acc;
   }, {} as Record<number, number[]>);
}

export function isPristineOrder(rules: Record<number, number[]>, pages: number[]): boolean {
   for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      const next = pages[i + 1];
      if (rules[page] && next) {
         if (rules[page].includes(next)) {
            return false;
         }
      }
   }
   return true;
}

export function adjustPrintOrder(rules: Record<number, number[]>, pages: number[]): number[] {
   return [...pages].sort(
      (page1, page2) => (rules[page1]?.includes(page2) ?? false) ? 1 : -1
   );
}

export function findMiddlePoint(pages: number[]): number {
   const middleIndex = Math.ceil((pages.length - 1) / 2);
   return pages[middleIndex];
}


export function part1(input: string): string {
   const { rules, pages } = parseInput(input);
   const reducedRules = reduce(rules);

   let middlePoints = pages.map(page => {
      if (isPristineOrder(reducedRules, page)) {
         return findMiddlePoint(page);
      }
      return 0;
   });
   return `${sum(middlePoints)}`;
}

export function part2(input: string): string {
   const { rules, pages } = parseInput(input);
   const reducedRules = reduce(rules);

   let middlePoints = pages.map(page => {
      if (!isPristineOrder(reducedRules, page)) {
         const adjustedOrder = adjustPrintOrder(reducedRules, page);
         return findMiddlePoint(adjustedOrder);
      }
      return 0;
   }); 
   return `${sum(middlePoints)}`;
}