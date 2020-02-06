import { expect } from 'chai';
import { stringSplice, binarySearch, normalizeLnCol, eqLnCol, cmpLnCol, sortBound, prevLnCol, nextLnCol } from '../../src/utils/utils';

describe('test utils', () => {
  it('test stringSplice', () => {
    expect(stringSplice('abc', 0, 0, 'ddd')).equal('dddabc', 'prepend');
    expect(stringSplice('abc', 1, 0, 'ddd')).equal('adddbc', 'insert');
    expect(stringSplice('abc', 0, 14, 'ddd')).equal('ddd', 'count out of range');
    expect(stringSplice('abc', 2, 12, 'ddd')).equal('abddd', 'count out of range');
    expect(stringSplice('abc', 1, 1, 'ddd')).equal('adddc');
    expect(stringSplice('abc', 3, 2, 'ddd')).equal('abcddd');
    expect(stringSplice('abc', 3, 12, 'ddd')).equal('abcddd');
    expect(stringSplice('abc', 3, 12)).equal('abc');
    expect(stringSplice('abc', 1, 1)).equal('ac');
    expect(stringSplice('abcdefghij', 2, 3)).equal('abfghij');
  });

  it('test eqLnCol', () => {
    expect(eqLnCol([1, 2], [1, 3])).equal(false);
    expect(eqLnCol([1, 2], [1, 2])).equal(true);
    expect(eqLnCol([2, 2], [1, 1])).equal(false);
    expect(eqLnCol([2, 1], [3, 1])).equal(false);
  });

  it('test cmpLnCol', () => {
    expect(cmpLnCol([1, 2], [1, 3])).equal(-1);
    expect(cmpLnCol([1, 2], [1, 2])).equal(0);
    expect(cmpLnCol([2, 2], [1, 1])).equal(1);
    expect(cmpLnCol([2, 1], [3, 1])).equal(-1);
  });

  it('test sortBound', () => {
    expect(sortBound([[1, 2], [1, 3]])).eql([[1, 2], [1, 3]]);
    expect(sortBound([[1, 2], [1, 2]])).eql([[1, 2], [1, 2]]);
    expect(sortBound([[2, 2], [1, 1]])).eql([[1, 1], [2, 2]]);
    expect(sortBound([[2, 1], [3, 1]])).eql([[2, 1], [3, 1]]);
  });

  it('test normalizeLnCol', () => {
    expect(normalizeLnCol(['abc', 'defg', '', 'a'], [1, 4])).eql([1, 4]);
    expect(normalizeLnCol(['abc', 'defg', '', 'a'], [3, 1])).eql([3, 1]);
    expect(normalizeLnCol(['abc', 'defg', '', 'a'], [9, 9])).eql([4, 2]);
    expect(normalizeLnCol(['abc', 'defg', '', 'a'], [-9, -9])).eql([1, 1]);
    expect(normalizeLnCol(['abc', 'defg', '', 'a'], [2, 9])).eql([2, 5]);
    expect(normalizeLnCol(['abc', 'defg', '', 'a'], [3, 2])).eql([3, 1]);
    // empty test.
  });

  it('test prevLnCol', () => {
    expect(prevLnCol(['abc', 'defg', '', 'a'], [1, 4])).eql([1, 3]);
    expect(prevLnCol(['abc', 'defg', '', 'a'], [3, 1])).eql([2, 5]);
    expect(prevLnCol(['abc', 'defg', '', 'a'], [9, 9])).eql([4, 1]);
    expect(prevLnCol(['abc', 'defg', '', 'a'], [-9, -9])).eql([1, 1]);
    expect(prevLnCol(['abc', 'defg', '', 'a'], [2, 9])).eql([2, 4]);
    expect(prevLnCol(['abc', 'defg', '', 'a'], [3, 2])).eql([2, 5]);
    // empty test.
  });

  it('test nextLnCol', () => {
    expect(nextLnCol(['abc', 'defg', '', 'a'], [1, 4])).eql([2, 1]);
    expect(nextLnCol(['abc', 'defg', '', 'a'], [3, 1])).eql([4, 1]);
    expect(nextLnCol(['abc', 'defg', '', 'a'], [9, 9])).eql([4, 2]);
    expect(nextLnCol(['abc', 'defg', '', 'a'], [-9, -9])).eql([1, 2]);
    expect(nextLnCol(['abc', 'defg', '', 'a'], [2, 9])).eql([3, 1]);
    expect(nextLnCol(['abc', 'defg', '', 'a'], [3, 2])).eql([4, 1]);
    // empty test.
  });

  it('test binarySearch', () => {
    expect(binarySearch([1,3,4,5,7,8], 5)).equal(3);
    expect(binarySearch([1,3,4,5,7,8], 8)).equal(5);
    expect(binarySearch([1,3,4,5,7,8], 9)).equal(6);
    expect(binarySearch([1,3,4,5,7,8], 0)).equal(0);
    expect(binarySearch([1,3,4,5,7,8], 2)).equal(1);
    expect(binarySearch([1,3,4,5,7,8], 6)).equal(4);
    expect(binarySearch([1,3,4,5,7,8], 1)).equal(0);
  })
});