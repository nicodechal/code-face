export const RESERVED_WORDS = ['await', 'break', 'case', 'catch', 'class', 'const', 'continue', 'debugger', 'default', 'delete', 'do', 'else', 'enum', 'export', 'extends', 'false', 'finally', 'for', 'function', 'if', 'import', 'in', 'instanceof', 'new', 'null', 'return', 'super', 'switch', 'this', 'throw', 'true', 'try', 'typeof', 'var', 'void', 'while', 'with', 'yield'];

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


let func: (stirng) => string = null;

function parseToken(input: string): string {
  return input;
}

export function parser(lines: string[]): string[] {
  const result = [];
  for (const line of lines) {
    result.push(func(line));
  }
}

func = parseToken;