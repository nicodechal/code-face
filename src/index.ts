import { Render } from './display/render';
import { scrollEl, linesEl } from './display/dom';
import { Editor } from './model/editor';
import { keyMap } from './display/commands';
import { generateKey } from './utils/utils';
import { TopLeft2LnCol } from './display/converter';

const input: HTMLInputElement = document.querySelector('#textarea');

const editor = new Editor();
const render = new Render();
render.render(editor);

(function(): void {
  /**
   * prev used to save the content in the textarea before current input.
   * e.g. when the input is 'a', and current textarea value is 'abca', then prev is 'abc'.
   * This is used to make sure IME works fine.
   */
  let prev = '';
  input.oninput = (e: InputEvent): void => {
  // This is also used to make sure IME works fine.
    setTimeout(() => {
      const cv = (e.target as HTMLInputElement).value;

      let same = 0;
      while (same < Math.min(prev.length, cv.length) && prev[same] == cv[same]) same++;
      const v = cv.slice(same);
    
      // this means input has changed.
      if (prev.slice(same) != cv.slice(same)) {
        const [l, r] = editor.getSelection();
        editor.select([l[0], l[1] - (prev.length - same)], r);
        editor.delete();
        editor.add(v == '\t' ? '  ' : v);
      } 

      if (cv.length > 1000) {
        (e.target as HTMLInputElement).value = '';
        prev = '';
      }
      prev = cv;
      render.render(editor);
    }, 0);
  };

  input.onkeydown = function (e: KeyboardEvent): void {
    // When IME input, just return. Opera is not considered now.
    if (e.keyCode == 229) return;
    // This makes sure the code below is only used to handle keymap.
    const key = generateKey(e.key, e.metaKey, e.ctrlKey, e.altKey, e.shiftKey);
    if (!keyMap.hasOwnProperty(key)) return;
    // for insert between words.
    (e.target as HTMLInputElement).value = '';
    prev = '';
    keyMap[key](editor);
    render.render(editor);
    if (!editor.state.pasting) e.preventDefault();
    else editor.state.pasting = false;
  };
})();


scrollEl.onclick = function(): void {
  scrollEl.style.border = '1px solid #666';
  input.focus();
};

linesEl.onclick = function(e: MouseEvent): void {
  if (editor.state.selecting) return;
  const rect = linesEl.getBoundingClientRect();
  const top = e.clientY - rect.top;
  const left = e.clientX - rect.left;
  const [ln, col] = TopLeft2LnCol(editor.getLines().content, [top, left]);
  editor.select([ln, col]);
  render.render(editor);
};

(function (): void {
  let prePos = editor.getSelection()[1];
  document.onmousemove = function(e: MouseEvent): void {
    const rect = linesEl.getBoundingClientRect();
    const top = e.clientY - rect.top;
    const left = e.clientX - rect.left;
    const [ln, col] = TopLeft2LnCol(editor.getLines().content, [top, left]);
    if (e.buttons) {
      editor.state.selecting = true;
      editor.select(prePos, [ln, col]);
      input.focus();
      render.render(editor);
    } else {
      editor.state.selecting = false;
      prePos = [ln, col];
    }
  };
})();