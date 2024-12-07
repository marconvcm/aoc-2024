
export function mergeSort(arr: number[]): number[] {
   if (arr.length <= 1) {
      return arr;
   }
   const middle = Math.floor(arr.length / 2);
   const left = arr.slice(0, middle);
   const right = arr.slice(middle);
   return merge(mergeSort(left), mergeSort(right));
}

function merge(left: number[], right: number[]): number[] {
   let result = [];
   let leftIndex = 0;
   let rightIndex = 0;
   while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
         result.push(left[leftIndex]);
         leftIndex++;
      } else {
         result.push(right[rightIndex]);
         rightIndex++;
      }
   }
   return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

export function part1(input: string): string {
   const left = [];
   const right = [];
   const arr = input.split("\n").map((x) => x.split("   "));
   
   for (let i = 0; i < arr.length; i++) {
      left.push(parseInt(arr[i][0]));
      right.push(parseInt(arr[i][1]));
   }
   
   const sortedLeft = mergeSort(left);
   const sortedRight = mergeSort(right);

   let result = 0;
   for (let i = 0; i < sortedLeft.length; i++) {
      result += Math.abs(sortedLeft[i] - sortedRight[i]);
   }

   return `${result}`; 
}

export function part2(input: string): string {
   let result = 0;

   const left: Record<number, number> = { };
   const right: Record<number, number> = { };
   const arr = input.split("\n").map((x) => x.split("   "));
   
   for (let i = 0; i < arr.length; i++) {
      
      if (left[parseInt(arr[i][0])]) {
         left[parseInt(arr[i][0])] += 1;
      } else {
         left[parseInt(arr[i][0])] = 1;
      }
      
      
      if (right[parseInt(arr[i][1])]) {
         right[parseInt(arr[i][1])] += 1;
      } else {
         right[parseInt(arr[i][1])] = 1;
      }
   }

   Object.entries(left).forEach(([key, value]) => {
      const intKey = parseInt(key);
      if (right[intKey]) {
         result += (intKey * right[intKey]) * value;
      }
   });

   return `${result}`; 
}