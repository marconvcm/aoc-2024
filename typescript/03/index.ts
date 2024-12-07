
const regex = /mul\((\d+),(\d+)\)/g;
const regex2 = /(do\(\)|don't\(\)|do_not\(\))|mul\((\d+),(\d+)\)/g;

export function part1(input: string): string {
   const matches = [...input.matchAll(regex)];
   const result = matches.map(match => {
      const x = parseInt(match[1] || match[3]);
      const y = parseInt(match[2] || match[4]);
      return x * y;
   }).reduce((acc, val) => acc + val, 0);
   return `${result}`;
}

export function part2(input: string): string {

   const matches = [...input.matchAll(regex2)];

   let execute = true;
   const results = [];

   for (const match of matches) {
      if (match[1]) { // It's a control statement
         const control = match[1];
         if (control === "do()") {
            execute = true;
         } else if (control === "don't()" || control === "do_not()" || control === 'dont()') {
            execute = false;
         }
      } else { // It's a mul statement
         if (!execute) { continue; }
         const x = match[2] || match[4]; // x comes from group 2 or 4
         const y = match[3] || match[5]; // y comes from group 3 or 5
         if (execute) {
            results.push({ x: parseInt(x), y: parseInt(y) });
         }
      }
   }
   
   const result = results.map(({ x, y }) => x * y).reduce((acc, val) => acc + val, 0);
   return `${result}`;
}