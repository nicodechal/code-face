export const DEFAULT_LINE_HEIGHT = '1.2';
export const EMPTY_LINE_WIDTH = 7;


export const SELECTOR = {
  LINES: '.lines',
  TEST: '.test-box',
  CURSOR: '.cursor',
  SELECT: '.select-box',
  SCROLLER: '.lines-scroll-box',
  LINE: '.line',
  LINE_NUMBER: '.line-number',
  LINE_CONTENT: '.line-content'
};

export const RESERVED_WORDS = ['await', 'break', 'case', 'catch', 'class', 'const', 'continue', 'debugger', 'default', 'delete', 'do', 'else', 'enum', 'export', 'extends', 'false', 'finally', 'for', 'function', 'if', 'import', 'in', 'instanceof', 'new', 'null', 'return', 'super', 'switch', 'this', 'throw', 'true', 'try', 'typeof', 'var', 'let', 'const','void', 'while', 'with', 'yield'];

export const PUNCTUATORS = ['{', '(', ')', '[', ']', '.', '...', ';', ',', '<', '>', '<', '=', '>=', '==', '!=', '===', '!==', '+', '-', '*', '%', '**', '++', '--', '<<', '>>', '>>>', '&', '|', '^', '!', '~', '&&', '||', '??', '?', ':', '=', '+=', '-=', '*=', '%=', '**=', '<<=', '>>=', '>>>=', '&=', '|=', '^=', '=>', '/', '/=', '}'];

export const LITERALS = ['null', 'true', 'false'];

export const BASIC_TYPES = ['number', 'string', 'boolean', 'symbol', 'function', 'bigint', 'object', 'undefined'];

export const EXTRA_TYPES = [
  'Object',
  'Function',
  'Boolean',
  'Symbol',
  'Error',
  'AggregateError',
  'EvalError',
  'InternalError',
  'RangeError',
  'ReferenceError',
  'SyntaxError',
  'TypeError',
  'URIError',

  'Number',
  'BigInt',
  'Math',
  'Date',

  'String',
  'RegExp',

  'Map',
  'Set',
  'WeakMap',
  'WeakSet',

  'ArrayBuffer',
  'SharedArrayBuffer',
  'Atomics',
  'DataView',
  'JSON',

  'Reflect',
  'Proxy',

  'Promise',
  'Generator',
  'GeneratorFunction',
  'AsyncFunction',
  'Iterator',
  'AsyncIterator',

  'arguments',

  'Infinity',
  'NaN',
  'globalThis',
];