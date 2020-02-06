type LnCol = [number, number];
type TopLeft = [number, number];
type LineTopLeft = [number, number];
type Bound = [LnCol, LnCol];

interface Content {
  add(c: string, b: Bound): LnCol;
  delete(b: Bound): LnCol;
  print(): string;
}

interface CursorControl {
  moveUp(): void;
  moveDown(): void;
  moveLeft(): void;
  moveRight(): void;
}

interface Edit extends CursorControl {
  add(s: string): void;
  delete(): void;
  select(s: LnCol, e?: LnCol): void;
}