interface CharWidthMap {
  get(ch: string): number;
}

export function splitLineWithWidth(line: string, width: number, m: CharWidthMap): string[] {
  if (~line.indexOf('\n') || line.length == 0) return [line];
  const res: string[] = [];
  let cur = '', curLen = 0;
  for (const ch of line) {
    const chLen = m.get(ch);
    if (chLen > width) return [line];
    if (curLen + chLen > width) {
      res.push(cur);
      cur = '';
      curLen = 0;
    }
    cur += ch;
    curLen += m.get(ch);
  }
  if (curLen) res.push(cur);
  return res;
}