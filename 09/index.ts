function parseDiskMap(input: string): (number | ".")[] {
   const blocks: (number | ".")[] = [];
   let fileId = 0;
   for (let i = 0; i < input.length; i++) {
      const length = Number(input[i]);
      if (i % 2 === 0) {
         // Even index: file segment
         for (let j = 0; j < length; j++) {
            blocks.push(fileId);
         }
         fileId++;
      } else {
         // Odd index: free space segment
         for (let j = 0; j < length; j++) {
            blocks.push(".");
         }
      }
   }
   return blocks;
}

function computeChecksum(blocks: (number | ".")[]): number {
   let checksum = 0;
   for (let i = 0; i < blocks.length; i++) {
      const b = blocks[i];
      if (b !== ".") {
         const fileId = b as number;
         checksum += i * fileId;
      }
   }
   return checksum;
}

// Part 1 related helpers
function hasGap(blocks: (number | ".")[]): boolean {
   // A gap exists if '.' occurs before the last file block
   let lastFileIndex = -1;
   for (let i = blocks.length - 1; i >= 0; i--) {
      if (blocks[i] !== ".") {
         lastFileIndex = i;
         break;
      }
   }
   if (lastFileIndex === -1) return false;
   for (let i = 0; i < lastFileIndex; i++) {
      if (blocks[i] === ".") {
         return true;
      }
   }
   return false;
}

function compactDiskPart1(blocks: (number | ".")[]): void {
   while (hasGap(blocks)) {
      let lastFileIndex = -1;
      for (let i = blocks.length - 1; i >= 0; i--) {
         if (blocks[i] !== ".") {
            lastFileIndex = i;
            break;
         }
      }

      // Find leftmost '.' before lastFileIndex
      let leftmostGap = -1;
      for (let i = 0; i < lastFileIndex; i++) {
         if (blocks[i] === ".") {
            leftmostGap = i;
            break;
         }
      }

      // Find rightmost file block
      let rightmostFileIndex = -1;
      for (let i = blocks.length - 1; i >= 0; i--) {
         if (blocks[i] !== ".") {
            rightmostFileIndex = i;
            break;
         }
      }

      // Move the file block
      const fileId = blocks[rightmostFileIndex];
      blocks[rightmostFileIndex] = ".";
      blocks[leftmostGap] = fileId!;
   }
}

// Part 2 related helpers
function findFilePosition(blocks: (number | ".")[], fileId: number): { start: number, end: number, length: number } | null {
   let start = -1;
   let end = -1;
   for (let i = 0; i < blocks.length; i++) {
      if (blocks[i] === fileId) {
         if (start === -1) start = i;
         end = i;
      } else if (start !== -1) {
         break;
      }
   }

   if (start === -1) return null;
   return { start, end, length: end - start + 1 };
}

function findMaxFileId(blocks: (number | ".")[]): number {
   let maxId = -1;
   for (const b of blocks) {
      if (b !== "." && (b as number) > maxId) {
         maxId = b as number;
      }
   }
   return maxId;
}

function findFreeSegment(blocks: (number | ".")[], lengthNeeded: number, maxEndIndex: number): number | null {
   let count = 0;
   let segStart = -1;
   for (let i = 0; i < maxEndIndex; i++) {
      if (blocks[i] === ".") {
         if (count === 0) segStart = i;
         count++;
         if (count >= lengthNeeded) {
            return segStart;
         }
      } else {
         count = 0;
      }
   }
   return null;
}

function compactDiskPart2(blocks: (number | ".")[]): void {
   const maxFileId = findMaxFileId(blocks);
   for (let fileId = maxFileId; fileId >= 0; fileId--) {
      const pos = findFilePosition(blocks, fileId);
      if (!pos) continue;
      const segmentStart = findFreeSegment(blocks, pos.length, pos.start);
      if (segmentStart !== null) {
         const fileBlocks: number[] = [];
         for (let i = pos.start; i <= pos.end; i++) {
            fileBlocks.push(blocks[i] as number);
            blocks[i] = ".";
         }
         for (let i = 0; i < fileBlocks.length; i++) {
            blocks[segmentStart + i] = fileBlocks[i];
         }
      }
   }
}

export function part1(input: string): string {
   const blocks = parseDiskMap(input);
   compactDiskPart1(blocks);
   return `${computeChecksum(blocks)}`;
}

export function part2(input: string): string {
   const blocks = parseDiskMap(input);
   compactDiskPart2(blocks);
   return `${computeChecksum(blocks)}`;
}
