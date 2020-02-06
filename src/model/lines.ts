import '../interface';
import { eqLnCol, stringSplice, normalizeLnCol, sortBound, normalizeLnCols } from '../utils/utils';


export class Lines implements Content {
  content: string[] = [''];
  
  setContent(c: string[]): Lines {
    this.content = c;
    return this;
  }

  add(added: string, b: Bound): LnCol {
    // delete selected text.
    const lnCol = eqLnCol(...b) ? b[0] : this.delete(b);
    const [ln, col] = normalizeLnCol(this.content, lnCol);

    // firstly add all words into one `line`, then split with `return`.
    const multiLines = stringSplice(this.content[ln - 1], col - 1, 0, added).split('\n'); 
    // used to calculate cursor's position.
    const rightLen = this.content[ln - 1].length - col + 1;
    this.content.splice(ln - 1, 1, ...multiLines);

    // calculate cursor's position after adding.
    const cursorLn = ln + multiLines.length - 1;
    const cursorCol = this.content[cursorLn - 1].length - rightLen + 1;

    return [cursorLn, cursorCol]; 
  }

  delete(b: Bound): LnCol {
    // normalize start & end.
    b = normalizeLnCols(this.content, b) as Bound;
    
    // reorder for start and end.
    const [[sln, scol], [eln, ecol]] = sortBound(b);
    // delete content.
    this.content[sln - 1] = 
      this.content[sln - 1].slice(0, scol - 1) + 
      this.content[eln - 1].slice(ecol - 1);
    this.content.splice(sln, eln - sln);
    
    // cursor's position after delete.
    return [sln, scol];
  }

  print(): string {
    return this.content.join('\n');
  }
}