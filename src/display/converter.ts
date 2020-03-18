import { normalizeLnCol, findNearestIndex } from '../utils/utils';
import { getLineBoxTop, getAllLineTopLefts, getLineRenderHeight } from './render-info';

/**
 * Get [ln, col]'s corresponding cursor position for cursor rendering
 * @param testEl Element for testing, has the same style as render area.
 * @param c Lines array of Content.
 * @param lc [ln, col] need to get render position.
 * @returns return coordinate relative to the top left corner of the row
 */
function LnCol2LineTopLeft(c: string[], lc: LnCol): LineTopLeft {
  const [ln, col] = normalizeLnCol(c, lc);
  const m: LineTopLeft[] = getAllLineTopLefts(c[ln - 1]);
  return m[col - 1];
}

/**
 * Get [ln, col]'s corresponding cursor position for cursor rendering
 * @param testEl Element for testing, has the same style as render area.
 * @param c Lines array of Content.
 * @param lc [ln, col] need to get render position.
 * @returns return coordinate relative to the top left corner of the lines box.
 */
export function LnCol2TopLeft(c: string[], lc: LnCol): TopLeft {
  const [ltop, lcol] = LnCol2LineTopLeft(c, lc);
  const offsetTop = getLineBoxTop(lc[0]);
  return [ltop + offsetTop, lcol];
}

export function LnCols2TopLefts(c: string[], lcs: LnCol[]): TopLeft[] {
  return lcs.map(v => LnCol2TopLeft(c, v));
}

export function TopLeft2LnCol(c: string[], [top, left]: TopLeft): LnCol {
  let curH = 0, ln = 1, hs;
  while (curH + (hs = getLineRenderHeight(ln)) < top && hs > 0) {
    curH += hs;
    ln++;
  }
  ln = Math.min(c.length, Math.max(1, ln));
  const ltl: LineTopLeft = [top - curH, left];
  const tls = getAllLineTopLefts(c[ln - 1]);
  const col = findNearestIndex(ltl, tls) + 1;
  return normalizeLnCol(c, [ln, col]);
}

export function TopLefts2LnCols(c: string[], tls: TopLeft[]): LnCol[] {
  return tls.map(v => TopLeft2LnCol(c, v));
}