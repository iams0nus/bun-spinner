export interface SpinnerOptions {
  text?: string;
  color?: Color;
  spinner?: SpinnerName | Spinner;
  ttl?: number;
  stream?: typeof Bun.stdout | typeof Bun.stderr;
  hideCursor?: boolean;
  indent?: number;
  interval?: number;
  discardStdin?: boolean;
}

export interface Spinner {
  interval: number;
  frames: string[];
}

export type Color = 
  | 'black'
  | 'red' 
  | 'green'
  | 'yellow'
  | 'blue'
  | 'magenta'
  | 'cyan'
  | 'white'
  | 'gray'
  | 'grey'
  | 'blackBright'
  | 'redBright'
  | 'greenBright'
  | 'yellowBright'
  | 'blueBright'
  | 'magentaBright'
  | 'cyanBright'
  | 'whiteBright'
  | number
  | string
  | [number, number, number];

export type SpinnerName =
  | 'dots'
  | 'dots2'
  | 'dots3'
  | 'dots4'
  | 'dots5'
  | 'dots6'
  | 'dots7'
  | 'dots8'
  | 'dots9'
  | 'dots10'
  | 'dots11'
  | 'dots12'
  | 'line'
  | 'line2'
  | 'pipe'
  | 'simpleDots'
  | 'simpleDotsScrolling'
  | 'star'
  | 'star2'
  | 'flip'
  | 'hamburger'
  | 'growVertical'
  | 'growHorizontal'
  | 'balloon'
  | 'balloon2'
  | 'noise'
  | 'bounce'
  | 'boxBounce'
  | 'boxBounce2'
  | 'triangle'
  | 'arc'
  | 'circle'
  | 'squareCorners'
  | 'circleQuarters'
  | 'circleHalves'
  | 'squish'
  | 'toggle'
  | 'toggle2'
  | 'toggle3'
  | 'toggle4'
  | 'toggle5'
  | 'toggle6'
  | 'toggle7'
  | 'toggle8'
  | 'toggle9'
  | 'toggle10'
  | 'toggle11'
  | 'toggle12'
  | 'toggle13'
  | 'arrow'
  | 'arrow2'
  | 'arrow3'
  | 'bouncingBar'
  | 'bouncingBall';