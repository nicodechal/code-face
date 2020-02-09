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

function selectUp(editor: Editor): void { editor.selectV(-1); }
function selectDown(editor: Editor): void { editor.selectV(1); }
function selectLeft(editor: Editor): void { editor.selectH(-1); }
function selectRight(editor: Editor): void { editor.selectH(1); }

export const keyMap = {
  'ArrowUp': (editor: Editor): void => moveUp(editor),
  'ArrowDown': (editor: Editor): void => moveDown(editor),
  'ArrowLeft': (editor: Editor): void => moveLeft(editor),
  'ArrowRight': (editor: Editor): void => moveRight(editor),
  'Backspace': (editor: Editor): void => deleteChar(editor),
  'Tab': (editor: Editor): void => { editor.add('  '); },
  'Meta+A': (editor: Editor): void => selectAll(editor),
  'Shift+ArrowUp': (editor: Editor): void => selectUp(editor),
  'Shift+ArrowDown': (editor: Editor): void => selectDown(editor),
  'Shift+ArrowLeft': (editor: Editor): void => selectLeft(editor),
  'Shift+ArrowRight': (editor: Editor): void => selectRight(editor),
  'Meta+V': (editor: Editor): void => { editorState.pasting = true; }
};