export class StringStream {
  private str: string;
  start: number;
  pos: number;

  constructor(str: string) {
    this.str = str;
    this.start = this.pos = 0;
  }

  next(): string {
    if (!this.end())
      return this.str.charAt(this.pos++);
  }

  current(): string {
    const ret = this.str.slice(this.start, this.pos);
    this.start = this.pos;
    return ret;
  }

  peek(): string {
    return this.str[this.pos];
  }

  end(): boolean {
    return this.pos >= this.str.length;
  }

  match(pattern): void {
    const mr = this.str.slice(this.pos).match(pattern);
    if (mr) {
      this.pos += mr[0].length;
    }
  }

  moveToEnd(): void {
    this.pos = this.str.length;
  }
}