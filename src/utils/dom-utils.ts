import { DEFAULT_LINE_HEIGHT } from '../global/constants';

export function createEl(tagName: string, content: string = null, classes: string[] | string = []): HTMLElement {
  const node = document.createElement(tagName);
  if (typeof classes == 'string') {
    node.classList.add(classes);
  } else for (const c of classes) {
    node.classList.add(c);
  }
  if (content != null) node.textContent = content;
  return node;
}

export function getElementWidth(el: HTMLElement): number {
  const rect = el.getBoundingClientRect();
  return rect.width;
}

export function getElementHeight(el: HTMLElement): number {
  const style = getComputedStyle(el);
  const lh = style.lineHeight;
  if (lh == 'normal') {
    el.style.lineHeight = DEFAULT_LINE_HEIGHT;
  }
  return parseFloat(lh);
}

export function scrollIntoViewIfNeeded(el: HTMLElement, conainer: HTMLElement): void {
  const cursorTop = el.offsetTop, scrollTop = conainer.scrollTop;
  if (cursorTop < scrollTop || cursorTop >= scrollTop + conainer.clientHeight - el.clientHeight) {
    el.scrollIntoView();
  }
}