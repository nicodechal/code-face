import '../interface';
import { Lines } from './lines';
import { normalizeLnCols, sortBound, eqLnCol } from '../utils/utils';
import { editorState } from '../global/state';

export class Editor {
  // [start, end] of selection, `end` is the cursor's position.
  private selection: Bound;
  private lines: Lines;

  constructor() {
    this.lines = new Lines();
    this.selection = [[1, 1], [1, 1]];
  }

  add(added: string, selection: Bound = this.selection): LnCol {
    selection = normalizeLnCols(this.lines.content, selection) as Bound;
    if (added == '' && eqLnCol(...selection)) return selection[1]; 
    const p = this.lines.add(added, selection);
    this.selection = [p, p];
    editorState.contentChanged = true;
    return p;
  }

  delete(selection: Bound = this.selection): LnCol {
    selection = normalizeLnCols(this.lines.content, selection) as Bound;
    const p = this.lines.delete(selection);
    this.selection = [p, p];
    editorState.contentChanged = true;
    return p;
  }

  select(s: LnCol, e: LnCol = s): Bound {
    this.selection = normalizeLnCols(this.lines.content, [s, e]) as Bound;
    return this.selection;
  }

  moveH(delta: number): LnCol {
    const [ln, col] = this.getSelection()[1], content = this.lines.content;
    let newCol = col + delta;
    // `content[ln - 1].length + 1`, the cursor positions count.
    if (newCol >= 1 && newCol <= content[ln - 1].length + 1) {
      return this.select([ln, newCol])[1];
    } else if (newCol < 1) {
      let newLn = ln - 1;
      while (newLn >= 1) {
        newCol += content[newLn - 1].length + 1;
        if (newCol >= 1) return this.select([newLn, newCol])[1];
        newLn--;
      }
      return this.select([1, 1])[1];
    } else {
      newCol -= content[ln - 1].length + 1;
      let newLn = ln + 1;
      while (newLn <= content.length) {
        if (newCol <= content[newLn - 1].length + 1) {
          return this.select([newLn, newCol])[1];
        }
        newCol -= content[ln - 1].length + 1;
        newLn++;
      }
      // select the last position of the document.
      return this.select([content.length, content[content.length - 1].length + 1])[1];
    }
  }

  moveV(delta: number): LnCol {
    const [ln, col] = this.getSelection()[1];
    return this.select([ln + delta, col])[1];
  }

  deleteH(delta: number): LnCol {
    const lc = this.getSelection()[1];
    const nlc = this.moveH(delta);
    this.select(...sortBound([lc, nlc]));
    editorState.contentChanged = true;
    return this.delete();
  }

  getSelection(): Bound {
    return this.selection;
  }

  getLines(): Lines {
    return this.lines;
  }  
}