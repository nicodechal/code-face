import { normalizeLnCol } from '../utils/utils';
import { getLineBoxTop, getAllLineTopLefts } from './render-info';

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