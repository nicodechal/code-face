import { Editor } from '../model/editor';
import { editorState } from '../global/state';

export function selectAll(editor: Editor): void {
  editor.select([1, 1], [Infinity, Infinity]);
}

export function deleteChar(editor: Editor): void {
  editorState.contentChanged = true;
  editor.deleteH(-1);
}

export function moveUp(editor: Editor): void { editor.moveV(-1); }
export function moveDown(editor: Editor): void { editor.moveV(1); }
export function moveLeft(editor: Editor): void { editor.moveH(-1); }
export function moveRight(editor: Editor): void { editor.moveH(1); }