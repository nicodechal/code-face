import { Editor } from '../model/editor';
import { linesEl, cursorEl, scrollEl } from './dom';
import { createEl, scrollIntoViewIfNeeded } from '../utils/dom-utils';
import { LnCol2TopLeft } from './converter';
import { renderSelectionRects } from './selection';
import { SELECTOR, RESERVED_WORDS, EXTRA_TYPES } from '../global/constants';
import { editorState } from '../global/state';

export class Render {

  render(editor: Editor): void {
    if (editorState.contentChanged) {
      this.renderLinesContent(editor);
      editorState.contentChanged = false;
    }
    this.renderSelection(editor);
  }

  private renderCursor(editor: Editor): void {
    const lc = editor.getSelection()[1];
    const txt: HTMLElement = document.querySelector('.text-box');
    const tl = LnCol2TopLeft(editor.getLines().content, lc);
    cursorEl.style.top = tl[0] + 'px';
    cursorEl.style.left = tl[1] + 'px';
    txt.style.top = tl[0] + 'px';
    txt.style.left = tl[1] + 'px';
    scrollIntoViewIfNeeded(cursorEl, scrollEl);
  }

  private renderSelection(editor: Editor): void {
    renderSelectionRects(editor.getLines().content, editor.getSelection());
    this.renderCursor(editor);
  }

  private renderLine(el: HTMLLIElement, ln: number, line: string): void {
    el.querySelector(SELECTOR.LINE_NUMBER).textContent = ln + '';
    el.querySelector(SELECTOR.LINE_CONTENT).innerHTML = line;
  }

  private renderLinesContent(editor: Editor): void {
    const content: string[] = editor.getLines().content.map(str => this.decorateLine(str));
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

  private decorateLine(str: string): string {
    RESERVED_WORDS.forEach(v => str = str.replace(new RegExp(`${v} `, 'g'), `<span class='keyword'>${v}</span> `));
    EXTRA_TYPES.forEach(v => str = str.replace(new RegExp(`${v}`, 'g'), `<span class='type'>${v}</span>`));
    return str;
  }
}