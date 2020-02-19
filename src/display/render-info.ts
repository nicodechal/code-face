import { linesEl, testEl } from './dom';
import { createEl } from '../utils/dom-utils';

/**
 * Get line's display height, if the line number is out of range, return 0.
 * @param ln line number
 */
export function getLineRenderHeight(ln: number): number {
  if (ln > linesEl.children.length) return 0;
  return linesEl.children[ln - 1].getBoundingClientRect().height;
}

/**
 * Get top of line `ln` in **linesEl**, it's the distance between 
 * linesEl's content top edge and line's content top edge.
 * @param ln line number
 */
export function getLineBoxTop(ln: number): number {
  const line = linesEl.children[ln - 1];
  const linesRect = linesEl.getBoundingClientRect();
  const lineRect = line.getBoundingClientRect();
  return lineRect.top - linesRect.top;
}

/**
 * This is used to make sure test line coordination result is displayed well when different fonts are used. 
 * This return a topleft offset make sure the first char's `topleft` in `testEl` is [0, 0].
 */
export function offsetDetect(): TopLeft {
  const spanEl = createEl('span', 'x');
  testEl.appendChild(spanEl);
  const spanRect = spanEl.getBoundingClientRect();
  const testRect = testEl.getBoundingClientRect();
  const tl: TopLeft = [
    spanRect.top - testRect.top, 
    spanRect.left - testRect.left
  ];
  spanEl.remove();
  return tl;
}

/**
 * This is used to calculate the `topleft` for the end of `str`.
 * It's useful for cursor position when line wrapping is on.
 * @param testEl Element for testing, has the same style as render area.
 * @param str Its end position's `topleft` will be calculated.
 * @returns str's end `topleft`.
 */
export function getEndLineTopLeft(str: string): LineTopLeft {
  const spanEl = createEl('span');
  spanEl.textContent = str;
  spanEl.appendChild(createEl('span', null, 'temp'));
  testEl.appendChild(spanEl);
  const tempEl = spanEl.querySelector('.temp');

  const tempRect = tempEl.getBoundingClientRect();
  const testRect = testEl.getBoundingClientRect();
  const tl: LineTopLeft = [
    tempRect.top - testRect.top, 
    tempRect.left - testRect.left
  ];
  spanEl.remove();
  return tl;
}

/**
 * Return an array including all the cursor positions of one `line` (0 start)
 * For example m[2] is the `topleft` value for cursor when cursor is at Col 3;
 * @param testEl Element for testing, has the same style as render area.
 * @param line The line used to calculate all cursor positions.
 * @returns All the positions cursor can be rendered in `line`.
 */
const cache = new Map(); // TODO: need to be improved.
export function getAllLineTopLefts(line: string): LineTopLeft[] {
  if (cache.has(line)) return cache.get(line);
  const [offsetTop, offsetLeft] = offsetDetect();
  const m: LineTopLeft[] = [[0, 0]];
  let str = '';
  for (const ch of line) {
    str += ch;
    const [top, left] = getEndLineTopLeft(str);
    m.push([top - offsetTop, left - offsetLeft]);
  }
  cache.set(line, m);
  return m;
}