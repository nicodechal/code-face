import '../interface';

export function stringSplice(str: string, start: number, count: number, added = ''): string {
  return str.slice(0, start) + added + str.slice(start + count);
}

export function eqLnCol(x: LnCol, y: LnCol): boolean {
  return x[0] == y[0] && x[1] == y[1];
}

export function cmpLnCol(x: LnCol, y: LnCol): number {
  return x[0] - y[0] ? x[0] - y[0] : x[1] - y[1];
}

export function sortBound([s, e]: Bound): Bound {
  return cmpLnCol(s, e) > 0 ? [e, s] : [s, e];
}

/**
 * Use to normalize *out of range* LnCol.
 */
export function normalizeLnCol(c: string[], [ln, col]: LnCol): LnCol {
  if (c.length == 0) throw Error(`input string array is empty, c: ${c}`);
  return [ 
    ln  = Math.min(c.length, Math.max(1, ln)),
    Math.min(c[ln - 1].length + 1, Math.max(1, col))
  ];
}

export function normalizeLnCols(c: string[], lcs: LnCol[]): LnCol[] {
  return lcs.map(v => normalizeLnCol(c, v));
}

export function prevLnCol(c: string[], lc: LnCol): LnCol {
  const [ln, col] = normalizeLnCol(c, lc);
  if (col - 1 > 0) 
    return [ln, col - 1];
  else if (ln - 2 >= 0) 
    return [ln - 1, c[ln - 2].length + 1];
  return [ln, col];
}

export function nextLnCol(c: string[], lc: LnCol): LnCol {
  const [ln, col] = normalizeLnCol(c, lc);
  if (col + 1 <= c[ln - 1].length + 1) 
    return [ln, col + 1];
  else if (ln < c.length) 
    return [ln + 1, 1];
  return [ln, col];
}

/**
 * Binary search, make sure the return index is a valid index.
 * Normally, this function will return the index who's value 
 * is less than or equal to target.
 */
export function binarySearch(arr: number[], target: number): number {
  let s = 0, e = arr.length - 1;
  while (s <= e) {
    const mid = (s + e) >> 1;
    if (arr[mid] < target) {
      s = mid + 1;
    } else if (arr[mid] > target) {
      e = mid - 1;
    } else {
      return mid;
    }
  }
  return s;
}