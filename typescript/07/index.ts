
export function canProduceTarget(numbers: number[], target: number, hasConcatenation: boolean = false): boolean {
   const ops = ['+', '*', '||'];

   const evaluate = (expression: string[]): number => {
      let result = Number(expression[0]);
      for (let i = 1; i < expression.length; i += 2) {
         const operator = expression[i];
         const operand = Number(expression[i + 1]);
         if (operator === '+') {
            result += operand;
         } else if (operator === '*') {
            result *= operand;
         } else if (operator === '||' && hasConcatenation) {
            result = Number(result.toString() + operand.toString());
         }
      }
      return result;
   };

   const generateExpressions = (numbers: number[]): string[][] => {
      if (numbers.length === 1) return [[numbers[0].toString()]];

      const expressions: string[][] = [];
      const [first, ...rest] = numbers;

      const restExpressions = generateExpressions(rest);
      for (const restExpr of restExpressions) {
         for (const op of ops) {
            if (op === '||' && !hasConcatenation) continue;
            expressions.push([first.toString(), op, ...restExpr]);
         }
      }
      return expressions;
   };

   const expressions = generateExpressions(numbers);

   for (const expr of expressions) {
      if (evaluate(expr) === target) return true;
   }

   return false;
}


export function part1(input: string): string {
   let total = 0;
   let lines = input.split('\n');

   for (const line of lines) {
      const [target, numbersStr] = line.split(': ');
      const targetValue = Number(target);
      const numbers = numbersStr.split(' ').map(Number);

      if (canProduceTarget(numbers, targetValue)) {
         total += targetValue;
      }
   }

   return `${total}`;
}

export function part2(input: string): string {
   let total = 0;
   let lines = input.split('\n');

   for (const line of lines) {
      const [target, numbersStr] = line.split(': ');
      const targetValue = Number(target);
      const numbers = numbersStr.split(' ').map(Number);

      if (canProduceTarget(numbers, targetValue, true)) {
         total += targetValue;
      }
   }

   return `${total}`;
}