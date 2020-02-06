import { Render } from './display/render';
import { scrollEl } from './display/dom';
import { Editor } from './model/editor';
import { deleteChar, moveUp, moveDown, moveLeft, moveRight } from './display/commands';

const input: HTMLInputElement = document.querySelector('#textarea');

const editor = new Editor();
const render = new Render();
render.render(editor);

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


const keymap = {
  'ArrowUp': (): void => moveUp(editor),
  'ArrowDown': (): void => moveDown(editor),
  'ArrowLeft': (): void => moveLeft(editor),
  'ArrowRight': (): void => moveRight(editor),
  'Backspace': (): void => deleteChar(editor),
  'Tab': (): void => { editor.add('  '); },
};

input.onkeydown = function (e: KeyboardEvent): void {
  // When IME input, just return. Opera is not considered now.
  if (e.keyCode == 229) return;
  // This makes sure the code below is only used to handle keymap.
  if (!keymap.hasOwnProperty(e.key)) return;

  // for insert between words.
  (e.target as HTMLInputElement).value = '';
  prev = '';

  keymap[e.key]();
  render.render(editor);
  e.preventDefault();
};

scrollEl.onclick = function(): void {
  scrollEl.style.border = '1px solid #666';
  input.focus();
};