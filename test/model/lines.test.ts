import { Lines } from '../../src/model/lines';
import { expect } from 'chai';


describe('test line content', () => {
  const lc = new Lines();
  const testStrs = [
    'hello',
    'world',
    '',
    'It\'s me',
    'This is so Cool, and Cool'
  ];
  it('delete', () => {
    lc.setContent(testStrs.slice());
    expect(lc.delete([[1, 3], [4, 6]])).eql([1, 3]);
    expect(lc.print()).equal('heme\nThis is so Cool, and Cool', 'normal');

    lc.setContent(testStrs.slice());
    lc.delete([[4, 6], [1, 3]]);
    expect(lc.print()).equal('heme\nThis is so Cool, and Cool', 'reverse');

    // lc.setContent(testStrs.slice());
    // lc.delete([[1, 1], [100, 100]]);
    // expect(lc.print()).equal('', 'delete all');

    lc.setContent(testStrs.slice());
    lc.delete([[1, 3], [4, 3]]);
    expect(lc.print()).equal('he\'s me\nThis is so Cool, and Cool', 'start normal, end normal');

    lc.setContent(testStrs.slice());
    lc.delete([[1, 1], [2, 6]]);
    expect(lc.print()).equal('\n\nIt\'s me\nThis is so Cool, and Cool', 'start at start, end at end');

    lc.setContent(testStrs.slice());
    lc.delete([[1, 1], [4, 3]]);
    expect(lc.print()).equal('\'s me\nThis is so Cool, and Cool', 'start at start, end normal');

    lc.setContent(testStrs.slice());
    lc.delete([[1, 6], [4, 3]]);
    expect(lc.print()).equal('hello\'s me\nThis is so Cool, and Cool', 'start at end, end normal');

    lc.setContent(testStrs.slice());
    lc.delete([[1, 6], [2, 1]]);
    expect(lc.print()).equal('helloworld\n\nIt\'s me\nThis is so Cool, and Cool', 'start at end, end at start');

    lc.setContent(testStrs.slice());
    lc.delete([[1, 1], [3, 1]]);
    expect(lc.print()).equal('\nIt\'s me\nThis is so Cool, and Cool', 'start at start, end at empty');

    lc.setContent(testStrs.slice());
    lc.delete([[3, 1], [4, 2]]);
    expect(lc.print()).equal('hello\nworld\nt\'s me\nThis is so Cool, and Cool', 'start at start, end at empty');
  });

  it('add', () => {
    let pos: LnCol;

    lc.setContent(testStrs.slice());
    pos = lc.add('added', [[3, 1], [3, 1]]);
    expect(lc.print()).equal('hello\nworld\nadded\nIt\'s me\nThis is so Cool, and Cool', 'add one word to empty line');
    expect(pos).eql([3, 6]);

    lc.setContent(testStrs.slice());
    pos = lc.add('added', [[2, 2], [2, 2]]);
    expect(lc.print()).equal('hello\nwaddedorld\n\nIt\'s me\nThis is so Cool, and Cool', 'add one word to empty line');
    expect(pos).eql([2, 7]);

    lc.setContent(testStrs.slice());
    pos = lc.add('one line\ntwo line', [[3, 1], [3, 1]]);
    expect(lc.print()).equal('hello\nworld\none line\ntwo line\nIt\'s me\nThis is so Cool, and Cool', 'add multiple lines to empty line');
    expect(pos).eql([4, 9]);

    lc.setContent(testStrs.slice());
    pos = lc.add('one line\ntwo line', [[2, 2], [2, 2]]);
    expect(lc.print()).equal('hello\nwone line\ntwo lineorld\n\nIt\'s me\nThis is so Cool, and Cool', 'add multiple lines to line');
    expect(pos).eql([3, 9]);

    lc.setContent(testStrs.slice());
    pos = lc.add('one line\ntwo line\n', [[2, 2], [2, 2]]);
    expect(lc.print()).equal('hello\nwone line\ntwo line\norld\n\nIt\'s me\nThis is so Cool, and Cool', 'add multiple lines end with return to line');
    expect(pos).eql([4, 1]);

    lc.setContent(testStrs.slice());
    pos = lc.add('one line\ntwo line\n', [[2, 1], [2, 1]]);
    expect(lc.print()).equal('hello\none line\ntwo line\nworld\n\nIt\'s me\nThis is so Cool, and Cool', 'add to line start');
    expect(pos).eql([4, 1]);
  });
});