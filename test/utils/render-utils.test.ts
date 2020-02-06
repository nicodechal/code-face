import { splitLineWithWidth } from '../../src/utils/render-utils';
import { expect } from 'chai';

describe('test render utils', () => {
  it('test splitLineWithWidth', () => {
    expect(splitLineWithWidth('hello', 10, { get() { return 3;} })).eql(['hel', 'lo']);
    expect(splitLineWithWidth('hello', 10, { get() { return 4;} })).eql(['he', 'll', 'o']);
    expect(splitLineWithWidth('hello', 4, { get() { return 4;} })).eql(['h', 'e', 'l', 'l', 'o']);
    expect(splitLineWithWidth('hello', 3, { get() { return 4;} })).eql(['hello']);
    expect(splitLineWithWidth('', 3, { get() { return 4;} })).eql(['']);
  });
});