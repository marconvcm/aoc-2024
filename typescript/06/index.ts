const wall = "#"
const floor = "."
const startPoint = "^"

const directions = {
   u: [0, -1],
   r: [1, 0],
   l: [-1, 0],
   d: [0, 1],
};

const directionSequence = ["u", "r", "d", "l"];
let currentDirection = 0;

function cycleDirection(): void {
   currentDirection = (currentDirection + 1) % directionSequence.length;
}

function move([x, y]: number[], direction: string): [number, number] {
   const [dx, dy] = directions[direction as keyof typeof directions];
   return [x + dx, y + dy];
}

function isWall(map: string[][], [x, y]: number[]): boolean {
   return map[y][x] === wall;
}


function findStartPoint(map: string[][]): [number, number] {
   for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[y].length; x++) {
         if (map[y][x] === startPoint) {
            return [x, y];
         }
      }
   }
   return [0, 0];
}

function formatMap(input: string): string[][] {
   return input.split("\n").map(row => row.split(""));
}

function outOfBounds(map: string[][], [x, y]: number[]): boolean {
   return x < 0 || y < 0 || x >= map[0].length || y >= map.length;
}

export function part1(input: string): string {
   currentDirection = 0;
   const map = formatMap(input);
   const startPoint = findStartPoint(map);
   let position = startPoint;
   let visitedPositions = new Set<string>();
   while (true) {
      let next = move(position, directionSequence[currentDirection]);
      if (outOfBounds(map, next)) {
         break;
      }
      if (isWall(map, next)) {
         cycleDirection();
         continue;
      } else {
         position = next;
      }
      visitedPositions.add(`${position[0]},${position[1]}`);
   }
   return `${visitedPositions.size}`;
}

export function part2(input: string): string {

   const map = formatMap(input);
   const startPoint = findStartPoint(map);

   let count = 0;

   for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[y].length; x++) {

         if (map[y][x] === wall || (x === startPoint[0] && y === startPoint[1])) {
            continue;
         }

         let direction = 0;
         let position = startPoint;
         let seen = new Set<string>();
         let isLoop = false;

         while (true) {

            const stateKey = `${position[0]},${position[1]},${direction}`;

            if (seen.has(stateKey)) {
               isLoop = true;
               break;
            }

            seen.add(stateKey);

            // Calculate the next position
            const [dx, dy] = directions[directionSequence[direction] as keyof typeof directions];
            const nextPosition: [number, number] = [position[0] + dx, position[1] + dy];

            // If out of bounds or hits obstruction, stop
            if (outOfBounds(map, nextPosition)) {
               break;
            }

            // If wall, turn right, or obstacle, turn right
            if (isWall(map, nextPosition) || (nextPosition[0] === x && nextPosition[1] === y)) {
               direction = (direction + 1) % 4;
            } else {
               position = nextPosition; // Move forward
            }
         }

         // Count if a loop is detected
         if (isLoop) {
            count++;
         }
      }
   }

   return `${count}`;
}