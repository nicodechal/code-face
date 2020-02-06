type LnCol = [number, number];
type TopLeft = [number, number];
type LineTopLeft = [number, number];
type Bound = [LnCol, LnCol];

interface Content {
  add(c: string, b: Bound): LnCol;
  delete(b: Bound): LnCol;
  print(): string;
}