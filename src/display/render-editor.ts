import { Editor } from '../model/editor';
import { linesEl, cursorEl, scrollEl } from './dom';
import { createEl, scrollIntoViewIfNeeded } from '../utils/dom-utils';
import { LnCol2TopLeft } from './converter';
import { renderSelectionRects } from './selection';
import { eqLnCol } from '../utils/utils';
import { SELECTOR, RESERVED_WORDS, EXTRA_TYPES } from '../global';

export class RenderEditor implements Edit {
  private editor: Editor;
  private changed: boolean;

  constructor() {
    this.editor = new Editor();
    this.changed = true;
  }

  add(str: string): void {
    if (str.length) {
      this.editor.add(str, this.editor.getSelection());
      this.changed = true;
    }
  }

  delete(): void {
    if (!eqLnCol(...this.editor.getSelection())) {
      this.editor.delete();
      this.changed = true;
    }
  }

  select(s: LnCol, e: LnCol = s): void {
    this.editor.select(s, e);
  }

  back(): void {
    // const [ln, col] = this.editor.getSelection()[1];
    // const [pln, pcol] = prevLnCol(this.editor.getLines().content, [ln, col]);
    // this.editor.select([pln, pcol], [ln, col]);
    // this.editor.delete();
    this.changed = true;
    this.editor.deleteH(-1);
  }

  moveUp(): void {
    // const [ln, col] = this.editor.getSelection()[1];
    // this.editor.select([ln - 1, col]);
    this.editor.moveV(-1);
  }
  moveDown(): void {
    // const [ln, col] = this.editor.getSelection()[1];
    // this.editor.select([ln + 1, col]);
    this.editor.moveV(1);
  }
  moveLeft(): void {
    // const [ln, col] = this.editor.getSelection()[1];
    // const [pln, pcol] = prevLnCol(this.editor.getLines().content, [ln, col]);
    // this.editor.select([pln, pcol]);
    this.editor.moveH(-1);
  }
  moveRight(): void {
    // const [ln, col] = this.editor.getSelection()[1];
    // const [nln, ncol] = nextLnCol(this.editor.getLines().content, [ln, col]);
    // this.editor.select([nln, ncol]);
    this.editor.moveH(1);
  }

  getSelection(): Bound {
    return this.editor.getSelection();
  }

  render(): void {
    if (this.changed) {
      this.renderLinesContent(this.editor.getLines().content);
      this.changed = false;
    }
    this.renderSelection();
  }

  renderCursor(lc: LnCol = this.editor.getSelection()[1]): void {
    const txt: HTMLElement = document.querySelector('.text-box');
    const tl = LnCol2TopLeft(this.editor.getLines().content, lc);
    cursorEl.style.top = tl[0] + 'px';
    cursorEl.style.left = tl[1] + 'px';
    txt.style.top = tl[0] + 'px';
    txt.style.left = tl[1] + 'px';
    scrollIntoViewIfNeeded(cursorEl, scrollEl);
  }

  renderSelection(lc: LnCol = this.editor.getSelection()[1]): void {
    renderSelectionRects(this.editor.getLines().content, this.editor.getSelection());
    this.renderCursor(lc);
  }

  renderLine(el: HTMLLIElement, ln: number, line: string): void {
    el.querySelector(SELECTOR.LINE_NUMBER).textContent = ln + '';
    el.querySelector(SELECTOR.LINE_CONTENT).innerHTML = line;
  }

  renderLinesContent(content: string[]): void {
    content = this.editor.getLines().content.map(str => this.decorateLine(str));
    let i = 0;
    while (i < content.length) {
      const line = content[i];
      let lineEl = null;
      if (i < linesEl.children.length) {
        lineEl = linesEl.children[i];
      } else {
        lineEl = createEl('div', null, SELECTOR.LINE.slice(1));
        lineEl.appendChild(createEl('span', null, SELECTOR.LINE_NUMBER.slice(1)));
        lineEl.appendChild(createEl('div', null, SELECTOR.LINE_CONTENT.slice(1)));
        linesEl.appendChild(lineEl);
      }
      this.renderLine(lineEl, i + 1, line.length == 0 ? ' ' : line);
      i++;
    }
    while (i < linesEl.children.length) {
      linesEl.children[i].querySelector(SELECTOR.LINE_NUMBER).textContent = '';
      linesEl.children[i].querySelector(SELECTOR.LINE_CONTENT).textContent = '';
      i++;
    }
  }

  decorateLine(str: string): string {
    RESERVED_WORDS.forEach(v => str = str.replace(new RegExp(`${v} `, 'g'), `<span class='keyword'>${v}</span> `));
    EXTRA_TYPES.forEach(v => str = str.replace(new RegExp(`${v}`, 'g'), `<span class='type'>${v}</span>`));
    return str;
  }
}