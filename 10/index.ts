const deltas = [
   { x: 0, y: -1 },
   { x: 1, y: 0 },
   { x: 0, y: 1 },
   { x: -1, y: 0 },
];

export function findAllReachableNines(
   input: number[][],
   startPosition: { x: number; y: number }
): { x: number; y: number }[] {
   const rows = input.length;
   const cols = input[0].length;
   const startHeight = input[startPosition.y][startPosition.x];

   // If the starting position isn't height 0, it's not a trailhead
   if (startHeight !== 0) {
      return [];
   }



   const visited = new Set<string>();
   const reachableNines: { x: number; y: number }[] = [];

   // We'll use a simple DFS/BFS with a stack
   const stack = [{ x: startPosition.x, y: startPosition.y, height: startHeight }];
   visited.add(`${startPosition.x},${startPosition.y}`);

   while (stack.length > 0) {
      const { x, y, height } = stack.pop()!;

      // If we reached height 9, record this position
      if (height === 9) {
         reachableNines.push({ x, y });
         // No need to continue from height 9 since we can't go higher
         continue;
      }

      // Try moving to adjacent cells with height exactly (height+1)
      for (const delta of deltas) {
         const nx = x + delta.x;
         const ny = y + delta.y;
         if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) {
            const nextHeight = input[ny][nx];
            if (nextHeight === height + 1) {
               const key = `${nx},${ny}`;
               if (!visited.has(key)) {
                  visited.add(key);
                  stack.push({ x: nx, y: ny, height: nextHeight });
               }
            }
         }
      }
   }

   return reachableNines;
}

function inBounds(x: number, y: number, width: number, height: number): boolean {
   return x >= 0 && x < width && y >= 0 && y < height;
}

// Memoized DFS to find the number of distinct paths from a cell to any height-9 cell
function countPaths(
   grid: number[][],
   x: number,
   y: number,
   memo: Map<string, number>
): number {
   const rows = grid.length;
   const cols = grid[0].length;
   const key = `${x},${y}`;

   if (memo.has(key)) {
      return memo.get(key)!;
   }

   const currentHeight = grid[y][x];
   if (currentHeight === 9) {
      memo.set(key, 1);
      return 1;
   }

   let ways = 0;
   for (const d of deltas) {
      const nx = x + d.x;
      const ny = y + d.y;
      if (inBounds(nx, ny, cols, rows) && grid[ny][nx] === currentHeight + 1) {
         ways += countPaths(grid, nx, ny, memo);
      }
   }

   memo.set(key, ways);
   return ways;
}


export function formatInput(input: string): number[][] {
   return input.split("\n").map(line => line.split("").map(Number));
}

export function part1(inputStr: string): string {
   const input = formatInput(inputStr);
   let totalScore = 0;
   // Find all trailheads (tiles with height 0)
   for (let y = 0; y < input.length; y++) {
      for (let x = 0; x < input[0].length; x++) {
         if (input[y][x] === 0) {
            // This is a trailhead; find all reachable 9's
            const reachableNines = findAllReachableNines(input, { x, y });
            // Count unique reachable 9 positions
            const uniqueNines = new Set(reachableNines.map(pos => `${pos.x},${pos.y}`));
            totalScore += uniqueNines.size;
         }
      }
   }

   return totalScore.toString();
}

export function part2(inputStr: string): string {
   const input = formatInput(inputStr);
   const rows = input.length;
   const cols = input[0].length;

   const memo = new Map<string, number>();

   let totalRating = 0;
   // For each trailhead (height 0), we sum up the number of distinct paths.
   for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
         if (input[y][x] === 0) {
            // Trailhead found
            const waysFromThisTrailhead = countPaths(input, x, y, memo);
            totalRating += waysFromThisTrailhead;
         }
      }
   }

   return totalRating.toString();
}