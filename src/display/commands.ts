import { Editor } from '../model/editor';
import { editorState } from '../global/state';

function selectAll(editor: Editor): void {
  editor.select([1, 1], [Infinity, Infinity]);
}

function deleteChar(editor: Editor): void {
  editorState.contentChanged = true;
  editor.deleteH(-1);
}

function moveUp(editor: Editor): void { editor.moveV(-1); }
function moveDown(editor: Editor): void { editor.moveV(1); }
function moveLeft(editor: Editor): void { editor.moveH(-1); }
function moveRight(editor: Editor): void { editor.moveH(1); }

export const keyMap = {
  'ArrowUp': (editor: Editor): void => moveUp(editor),
  'ArrowDown': (editor: Editor): void => moveDown(editor),
  'ArrowLeft': (editor: Editor): void => moveLeft(editor),
  'ArrowRight': (editor: Editor): void => moveRight(editor),
  'Backspace': (editor: Editor): void => deleteChar(editor),
  'Tab': (editor: Editor): void => { editor.add('  '); },
  'Meta+A': (editor: Editor): void => selectAll(editor)
};