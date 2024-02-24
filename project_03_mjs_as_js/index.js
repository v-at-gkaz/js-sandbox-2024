import Square from "./square.js";
import { Square123456 as Square2 } from "./square123456.js";

const o = new Square(4);
const o2 = new Square2(3);

console.log(`Square = ${o.area()}`);

console.log(`Square2 = ${o2.area()}`);