import { part1 as d1p1, part2 as d1p2 } from './01';
import { part1 as d2p1, part2 as d2p2 } from './02';
import { part1 as d3p1, part2 as d3p2 } from './03';
import { part1 as d4p1, part2 as d4p2 } from './04';
import { readInput } from './utils';

console.log('======= Day 1 =======');
console.log('Part 1:', d1p1(readInput('01')));
console.log('Part 2:', d1p2(readInput('01')));

console.log('======= Day 2 =======');
console.log('Part 1:', d2p1(readInput('02')));
console.log('Part 2:', d2p2(readInput('02')));

console.log('======= Day 3 =======');
console.log('Part 1:', d3p1(readInput('03')));
console.log('Part 2:', d3p2(readInput('03')));

console.log('======= Day 4 =======');
console.log('Part 1:', d4p1(readInput('04')));
console.log('Part 2:', d4p2(readInput('04')));
