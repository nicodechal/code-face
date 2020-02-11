import { Editor } from '../model/editor';
import { linesEl, cursorEl, scrollEl } from './dom';
import { createEl, scrollIntoViewIfNeeded } from '../utils/dom-utils';
import { LnCol2TopLeft } from './converter';
import { renderSelectionRects } from './selection';
import { SELECTOR } from '../global/constants';
import { editorState } from '../global/state';
import { StringStream } from '../model/string-stream';
import { state } from '../parser/javascript';

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
    const content: string[] = this.decorateLines(editor.getLines().content);
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

  private decorateLines(lines: string[]): string[] {
    const dlines = Array(lines.length).fill('');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const ss = new StringStream(line);
      while (!ss.end()) {
        while (!ss.end() && ss.peek() == ' ') {
          ss.next();
        }
        dlines[i] += ss.current();
        const [style, tk] = state.f(ss, state);
        dlines[i] += `<span class=${style}>${tk}</span>`;
      }
    }
    return dlines;
  }
}