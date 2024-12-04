
function countWord(grid: string[], word: string): number {
   const directions = [
      [0, 1],   // right
      [1, 0],   // down
      [1, 1],   // down-right
      [1, -1],  // down-left
      [0, -1],  // left
      [-1, 0],  // up
      [-1, -1], // up-left
      [-1, 1],  // up-right
   ];

   const rows = grid.length;
   const cols = grid[0].length;
   const wordLength = word.length;
   let count = 0;

   function isValidPosition(x: number, y: number): boolean {
      return x >= 0 && x < rows && y >= 0 && y < cols;
   }

   for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
         for (const [dr, dc] of directions) {
            let match = true;
            for (let i = 0; i < wordLength; i++) {
               const newRow = r + i * dr;
               const newCol = c + i * dc;
               if (!isValidPosition(newRow, newCol) || grid[newRow][newCol] !== word[i]) {
                  match = false;
                  break;
               }
            }
            if (match) {
               count++;
            }
         }
      }
   }

   return count;
}

function countXMAS(grid: string[]): number {
   const rows = grid.length;
   const cols = grid[0].length;
   let count = 0;

   const isValidWord = (sequence: string): boolean => {
      return sequence === "MAS" || sequence === "SAM";
   };

   const checkBounds = (r: number, c: number): boolean => {
      return r >= 0 && r < rows && c >= 0 && c < cols;
   };

   for (let r = 1; r <= rows - 2; r++) {
      for (let c = 1; c < cols - 1; c++) {

         const isOutbound = !checkBounds(r - 1, c - 1) || !checkBounds(r + 1, c + 1) || !checkBounds(r - 1, c + 1) || !checkBounds(r + 1, c - 1);

         if (grid[r][c] !== 'A' || isOutbound) {
            continue;
         }

         const diagonal1 = grid[r - 1][c - 1] + grid[r][c] + grid[r + 1][c + 1];
         const diagonal2 = grid[r - 1][c + 1] + grid[r][c] + grid[r + 1][c - 1];

         if (isValidWord(diagonal1) && isValidWord(diagonal2)) {
            count++;
         }
      }
   }

   return count;
}

export function part1(input: string): string {
   let count = countWord(input.split("\n"), "XMAS");
   return `${count}`;
}

export function part2(input: string): string {
   let count = countXMAS(input.split("\n"));
   return `${count}`;
}