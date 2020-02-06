import { RenderEditor } from './display/render-editor';
import { scrollEl } from './display/dom';

const input: HTMLInputElement = document.querySelector('#textarea');

const edt = new RenderEditor();
edt.render();

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
      const [l, r] = edt.getSelection();
      edt.select([l[0], l[1] - (prev.length - same)], r);
      edt.delete();
      edt.add(v == '\t' ? '  ' : v);
    } 

    if (cv.length > 1000) {
      (e.target as HTMLInputElement).value = '';
      prev = '';
    }
    prev = cv;
    edt.render();
  }, 0);
};


const keymap = {
  'ArrowUp': edt.moveUp.bind(edt),
  'ArrowDown': edt.moveDown.bind(edt),
  'ArrowLeft': edt.moveLeft.bind(edt),
  'ArrowRight': edt.moveRight.bind(edt),
  'Backspace': (): void => {
    // only when delete part is not in textarea.
    if (input.value == '') {
      edt.back();
      edt.render();
    }
  }
};

input.onkeydown = function (e: KeyboardEvent): void {
  // When IME input, just return. Opera is not considered now.
  if (e.keyCode == 229) return;
  // For Tab insert.
  if (e.key == 'Tab') {
    e.preventDefault();
    edt.add('  ');
    edt.render();
  }
  // This makes sure the code below is only used to handle keymap.
  if (!keymap.hasOwnProperty(e.key)) return;

  // for insert between words.
  input.value = '';
  prev = '';

  keymap[e.key]();
  edt.renderCursor();
};

scrollEl.onclick = function(): void {
  scrollEl.style.border = '1px solid #666';
  input.focus();
};