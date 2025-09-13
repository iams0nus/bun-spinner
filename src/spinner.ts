import { SpinnerOptions, Spinner as SpinnerType, Color } from './types.js';
import { spinners } from './spinners.js';
import { colorize, symbols } from './colors.js';

export class BunSpinner {
  private readonly options: Required<SpinnerOptions>;
  private readonly spinner: SpinnerType;
  private readonly stream: typeof Bun.stdout | typeof Bun.stderr;
  private frameIndex = 0;
  private id: Timer | null = null;
  private isSpinning = false;
  private linesToClear = 0;
  private ttlTimeout: Timer | null = null;
  private startTime = 0;
  private stopTime = 0;

  constructor(options: SpinnerOptions = {}) {
    this.options = {
      text: options.text ?? '',
      color: options.color ?? 'cyan',
      spinner: options.spinner ?? 'dots',
      ttl: options.ttl ?? 0,
      stream: options.stream ?? Bun.stderr,
      hideCursor: options.hideCursor ?? true,
      indent: options.indent ?? 0,
      interval: options.interval ?? 0,
      discardStdin: options.discardStdin ?? true,
    };

    this.stream = this.options.stream;
    this.spinner = this.resolveSpinner();
  }

  private resolveSpinner(): SpinnerType {
    const baseSpinner = typeof this.options.spinner === 'string' 
      ? spinners[this.options.spinner] || spinners['dots']
      : this.options.spinner;
      
    return this.options.interval > 0 
      ? { ...baseSpinner, interval: this.options.interval }
      : baseSpinner;
  }

  get text(): string {
    return this.options.text;
  }

  set text(value: string) {
    this.options.text = value;
    if (this.isSpinning) this.render();
  }

  get color(): Color {
    return this.options.color;
  }

  set color(value: Color) {
    this.options.color = value;
    if (this.isSpinning) this.render();
  }

  get indent(): number {
    return this.options.indent;
  }

  set indent(value: number) {
    this.options.indent = value;
    if (this.isSpinning) this.render();
  }

  get isEnabled(): boolean {
    return this.isTTY() && !Bun.env['CI'];
  }

  get elapsedTime(): number {
    if (!this.startTime) return 0;
    const endTime = this.stopTime || Date.now();
    return endTime - this.startTime;
  }

  start(text?: string): this {
    if (text) this.options.text = text;
    if (!this.isEnabled || this.isSpinning) return this;

    this.initializeSpinner();
    this.startAnimation();
    this.setupTTL();

    return this;
  }

  private initializeSpinner(): void {
    this.startTime = Date.now();
    if (this.options.hideCursor) this.stream.write('\u001B[?25l');
  }

  private startAnimation(): void {
    this.render();
    this.id = setInterval(() => {
      this.frameIndex = (this.frameIndex + 1) % this.spinner.frames.length;
      this.render();
    }, this.spinner.interval);
    this.isSpinning = true;
  }

  private setupTTL(): void {
    if (this.options.ttl > 0) {
      this.ttlTimeout = setTimeout(() => {
        this.stopTime = Date.now();
        this.stop();
      }, this.options.ttl);
    }
  }

  stop(): this {
    if (this.startTime && !this.stopTime) this.stopTime = Date.now();

    if (!this.isEnabled) return this;

    this.cleanup();
    this.resetState();
    if (this.options.hideCursor) this.stream.write('\u001B[?25h');

    return this;
  }

  private cleanup(): void {
    this.clearLine();
    if (this.id) {
      clearInterval(this.id);
      this.id = null;
    }
    if (this.ttlTimeout) {
      clearTimeout(this.ttlTimeout);
      this.ttlTimeout = null;
    }
  }

  private resetState(): void {
    this.frameIndex = 0;
    this.isSpinning = false;
    this.stopTime = 0;
  }

  succeed(text?: string): this {
    return this.stopAndPersist({
      symbol: symbols.success,
      text: text || this.text,
      color: 'green'
    });
  }

  fail(text?: string): this {
    return this.stopAndPersist({
      symbol: symbols.error,
      text: text || this.text,
      color: 'red'
    });
  }

  warn(text?: string): this {
    return this.stopAndPersist({
      symbol: symbols.warning,
      text: text || this.text,
      color: 'yellow'
    });
  }

  info(text?: string): this {
    return this.stopAndPersist({
      symbol: symbols.info,
      text: text || this.text,
      color: 'blue'
    });
  }

  stopAndPersist(options: { symbol?: string; text?: string; color?: Color } = {}): this {
    if (!this.isEnabled) return this;

    this.stop();
    this.writeOutput(
      options.symbol || ' ',
      options.text || this.text,
      options.color || this.options.color
    );

    return this;
  }

  private writeOutput(symbol: string, text: string, color: Color): void {
    const fullText = (symbol + ' ' + text).trim();
    const coloredText = colorize(fullText, color);
    const indent = ' '.repeat(this.options.indent);
    this.stream.write(indent + coloredText + '\n');
  }

  clear(): this {
    if (this.isEnabled && this.isSpinning) this.clearLine();
    return this;
  }

  private render(): void {
    if (!this.isEnabled || !this.isSpinning) return;

    this.clearLine();
    const output = this.buildOutput();
    this.stream.write(output);
    this.linesToClear = this.lineCount(output);
  }

  private buildOutput(): string {
    const frame = this.spinner.frames[this.frameIndex] || '';
    const fullText = this.options.text ? `${frame} ${this.options.text}` : frame;
    const coloredText = colorize(fullText, this.options.color);
    const indent = ' '.repeat(this.options.indent);
    return indent + coloredText;
  }

  private clearLine(): void {
    if (!this.isEnabled || this.linesToClear === 0) return;

    for (let i = 0; i < this.linesToClear; i++) {
      if (i > 0) this.stream.write('\u001B[1A');
      this.stream.write('\u001B[2K\u001B[0G');
    }
    this.linesToClear = 0;
  }

  private lineCount(text: string): number {
    return text.split('\n').length;
  }

  private isTTY(): boolean {
    return this.stream === Bun.stdout || this.stream === Bun.stderr;
  }
}