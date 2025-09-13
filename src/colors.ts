import { Color } from './types.js';

const namedColors: Record<string, number> = {
  black: 30,
  red: 31,
  green: 32,
  yellow: 33,
  blue: 34,
  magenta: 35,
  cyan: 36,
  white: 37,
  gray: 90,
  grey: 90,
  blackBright: 90,
  redBright: 91,
  greenBright: 92,
  yellowBright: 93,
  blueBright: 94,
  magentaBright: 95,
  cyanBright: 96,
  whiteBright: 97,
};

function hexToRgb(hex: string): [number, number, number] | null {
  const match = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  return match ? [
    parseInt(match[1], 16),
    parseInt(match[2], 16),
    parseInt(match[3], 16)
  ] : null;
}

function getColorCode(color: Color): string {
  if (typeof color === 'string' && color in namedColors) {
    return `${namedColors[color]}`;
  }
  
  if (typeof color === 'number') {
    if (color >= 0 && color <= 255) {
      return `38;5;${color}`;
    }
    return '39';
  }
  
  if (typeof color === 'string' && color.startsWith('#')) {
    const rgb = hexToRgb(color);
    if (rgb) {
      return `38;2;${rgb[0]};${rgb[1]};${rgb[2]}`;
    }
    return '39';
  }
  
  if (Array.isArray(color) && color.length === 3) {
    const [r, g, b] = color;
    if (r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255) {
      return `38;2;${r};${g};${b}`;
    }
    return '39';
  }
  
  return '39';
}

export function colorize(text: string, color: Color): string {
  const code = getColorCode(color);
  return `\u001b[${code}m${text}\u001b[39m`;
}

export const symbols = {
  info: '❯',
  success: '✔',
  warning: '⚠',
  error: '✖',
};