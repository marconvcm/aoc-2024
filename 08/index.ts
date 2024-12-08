export function isOutOfBounds(map: string[][], x: number, y: number): boolean {
   return x < 0 || y < 0 || x >= map[0].length || y >= map.length;
}

export function getMap(input: string): string[][] {
   return input.split("\n").map(line => line.split(""));
}

export function getMapValue(map: string[][], x: number, y: number): string | null {
   if (isOutOfBounds(map, x, y)) {
      return null;
   }
   return map[y][x];
}

export function isSpotAvailable(map: string[][], x: number, y: number): boolean {
   return getMapValue(map, x, y) === ".";
}

export function findAntennas(map: string[][]): Record<string, { x: number, y: number }[]> {
   const antennas: Record<string, { x: number, y: number }[]> = {};

   for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[y].length; x++) {
         const value = getMapValue(map, x, y);
         if (value === null || value === ".") {
            continue;
         }
         if (!antennas[value]) {
            antennas[value] = [];
         }
         antennas[value].push({ x, y });
      }
   }

   return antennas;
}

export function distanceBetween(a: { x: number, y: number }, b: { x: number, y: number }): { x: number, y: number } {
   return {
      x: a.x - b.x,
      y: a.y - b.y
   };
}


export function inferNodePoint(map: string[][], origin: { x: number, y: number }, delta: { x: number, y: number }): { x: number, y: number } | null {
   const x = origin.x + delta.x;
   const y = origin.y + delta.y;
   if (isOutOfBounds(map, x, y)) {
      return null;
   }
   return { x, y };
}

export function inferNodes(map: string[][], antennas: Record<string, { x: number, y: number }[]>): { x: number, y: number }[] {
   const nodes = new Set<string>();

   for (const antenna of Object.values(antennas)) {
      for (let i = 0; i < antenna.length; i++) {
         for (let j = 0; j < antenna.length; j++) {
            if (i === j) {
               continue;
            }
            const a = antenna[i];
            const b = antenna[j];
            const delta = distanceBetween(a, b);
            let node = inferNodePoint(map, a, delta);
            if (node) {
               nodes.add(`${node.x},${node.y}`);
            }
         }
      }
   }

   return new Array(...nodes).map(node => {
      const [x, y] = node.split(",").map(Number);
      return { x, y };
   });
}

export function inferNodesLines(map: string[][], antennas: Record<string, { x: number, y: number }[]>): { x: number, y: number }[] {
   const antinodes = new Set<string>();

   for (const [freq, antennaList] of Object.entries(antennas)) {
      // If there's only one antenna of this frequency, no line with another of same freq
      if (antennaList.length < 2) {
         continue;
      }

      for (let i = 0; i < antennaList.length; i++) {
         for (let j = i + 1; j < antennaList.length; j++) {
            const A = antennaList[i];
            const B = antennaList[j];

            const dx = B.x - A.x;
            const dy = B.y - A.y;

            const g = gcd(dx, dy);
            const stepX = dx / g;
            const stepY = dy / g;

            // From A, go forward (stepX, stepY) until out of bounds
            {
               let curX = A.x;
               let curY = A.y;
               // Move forward
               while (!isOutOfBounds(map, curX, curY)) {
                  antinodes.add(`${curX},${curY}`);
                  curX += stepX;
                  curY += stepY;
               }
            }

            // From A, go backward (-stepX, -stepY) until out of bounds
            {
               let curX = A.x;
               let curY = A.y;
               while (!isOutOfBounds(map, curX, curY)) {
                  antinodes.add(`${curX},${curY}`);
                  curX -= stepX;
                  curY -= stepY;
               }
            }
         }
      }
   }

   // Calculate gcd for reducing steps
   function gcd(a: number, b: number): number {
      a = Math.abs(a);
      b = Math.abs(b);
      while (b !== 0) {
         const t = b;
         b = a % b;
         a = t;
      }
      return a;
   }


   // Convert back to objects
   return Array.from(antinodes).map(str => {
      const [x, y] = str.split(",").map(Number);
      return { x, y };
   });
}


export function displayUpdatedMap(map: string[][], nodes: { x: number, y: number }[]): string {
   const updatedMap = map.map(line => [...line]);
   for (const node of nodes) {
      updatedMap[node.y][node.x] = "#";
   }
   return updatedMap.map(line => line.join("")).join("\n");
}

export function part1(input: string): string {
   const map = getMap(input);
   const antennas = findAntennas(map);
   const nodes = inferNodes(map, antennas);
   return `${nodes.length}`;
}

export function part2(input: string): string {
   const map = getMap(input.trim());
   const antennas = findAntennas(map);
   const nodes = inferNodesLines(map, antennas);
   return `${nodes.length}`;
}
