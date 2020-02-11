import { StringStream } from '../model/string-stream';

export const RESERVED_WORDS = ['await', 'break', 'case', 'catch', 'class', 'const', 'continue', 'debugger', 'default', 'delete', 'do', 'else', 'enum', 'export', 'extends', 'false', 'finally', 'for', 'function', 'if', 'import', 'in', 'instanceof', 'new', 'null', 'return', 'super', 'switch', 'this', 'throw', 'true', 'try', 'typeof', 'var', 'let', 'const', 'void', 'while', 'with', 'yield'];

interface State {
  f: (StringStream, State) => [string, string];
}

function nextUntilUnescaped(s: StringStream, end: string): boolean {
  let escaped = false, next;
  while ((next = s.next()) != null) {
    if (next == end && !escaped)
      return false;
    escaped = !escaped && next == '\\';
  }
  return escaped;
}

function genParseString(quote) {
  return function(s: StringStream, state: State): [string, string] {
    if (!nextUntilUnescaped(s, quote)) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      state.f = parseToken;
    }
    return ['string', s.current()];
  };
}

function parseComment(s: StringStream, state: State): [string, string] {
  let next, maybeEnd = false;
  while (next = s.next()) {
    if (next == '/' && maybeEnd) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      state.f = parseToken;
      break;
    }
    maybeEnd = (next == '*');
  }
  return ['comment', s.current()];
}

function parseToken(s: StringStream, state: State): [string, string] {
  if (s.end()) return ['', ''];
  let ch = s.next();
  if (ch == '\'' || ch == '\"') {
    // String
    state.f = genParseString(ch);
    return state.f(s, state);
  } else if (/[\[\]{}\(\),;\:\.]/.test(ch)) {
    // /[\[\]{}\(\),;\:\.]/
    return ['symbol', s.current()];
  } else if (ch == '0' && /[obxOBX]/.test(s.peek())) {
    // Non Decimal
    s.next();
    while (!s.end() && /[0-9a-fA-F]/.test(ch = s.peek())) {
      s.next();
    }
    return ['number', s.current()];
  } else if (/\d/.test(ch) || (ch == '-' && /\d/.test(s.peek()))) {
    // Float Number
    s.match(/^\d*(?:\.\d*)?(?:[eE][+\-]?\d+)?/);
    return ['number', s.current()];
  } else if (ch == '/') {
    if (s.peek() == '/') {
      // Single Line
      s.moveToEnd();
      return ['comment', s.current()];
    } else if (s.peek() == '*') {
      s.next();
      state.f = parseComment;
      return state.f(s, state);
    } else {
      while (!s.end() && /[+\-*&%=<>!?|]/.test(ch = s.peek())) s.next();
      return ['ops', s.current()];
    }
  } else if (/[+\-*&%=<>!?|]/.test(ch)) {
    while (!s.end() && /[+\-*&%=<>!?|]/.test(ch = s.peek())) s.next();
    return ['ops', s.current()];
  } else {
    while (!s.end() && /[\w\$_]/.test(ch = s.peek())) {
      s.next();
    }
    const word = s.current();
    if (~RESERVED_WORDS.indexOf(word)) {
      return ['keyword', word];
    } else {
      return ['variable', word];
    }
  }
}

export const state: State = { f: parseToken };
