import '../interface';
import { sortBound, normalizeLnCols } from '../utils/utils';
import { LnCols2TopLefts } from './converter';
import { getElementWidth, getElementHeight, createEl } from '../utils/dom-utils';
import { linesEl, selectBoxEl } from './dom';

function getSelectionRects(c: string[], b: Bound): number[][] {
  const lineWidth = getElementWidth(linesEl);
  const lineHeight = getElementHeight(linesEl);

  b = sortBound(normalizeLnCols(c, b) as Bound);
  const [[stop, sleft], [etop, eleft]] = LnCols2TopLefts(c, b);
  if (stop == etop) {
    return [
      [stop, sleft, eleft - sleft, lineHeight]
    ];
  }
  return [
    [stop, sleft, lineWidth - sleft, lineHeight],
    [stop + lineHeight, 0, lineWidth, Math.abs(etop - stop - lineHeight)],
    [etop, 0, eleft, lineHeight]
  ];
}

export function renderSelectionRects(c: string[], b: Bound): void {
  const rects = getSelectionRects(c, b);
  const children: HTMLCollection = selectBoxEl.children, sz = children.length;

  for (let i = 0; i < rects.length; i++) {
    const [top, left, width, height] = rects[i];
    const select: HTMLElement = i < sz ? children[i] as HTMLElement : createEl('div', null, 'select');
    select.style.display = 'block';
    select.style.top = top + 'px';
    select.style.left = left + 'px';
    select.style.width = width + 'px';
    select.style.height = height + 'px';
    if (i >= sz) {
      selectBoxEl.appendChild(select);
    }
  }
  for (let i = rects.length; i < sz; i++) {
    (children[i] as HTMLElement).style.display = 'none';
  }
}