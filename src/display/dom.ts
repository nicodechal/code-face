import { SELECTOR } from '../global';

const linesEl: HTMLElement = document.querySelector(SELECTOR.LINES);
const testEl: HTMLElement = document.querySelector(SELECTOR.TEST);
const cursorEl: HTMLElement = document.querySelector(SELECTOR.CURSOR);
const selectBoxEl: HTMLElement = document.querySelector(SELECTOR.SELECT);
const scrollEl: HTMLElement = document.querySelector(SELECTOR.SCROLLER);

export {
  linesEl,
  testEl,
  cursorEl,
  selectBoxEl,
  scrollEl
};