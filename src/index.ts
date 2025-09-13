import { BunSpinner } from './spinner.js';
import { SpinnerOptions } from './types.js';
import { spinners } from './spinners.js';

export function spinner(options?: SpinnerOptions | string): BunSpinner {
  if (typeof options === 'string') {
    return new BunSpinner({ text: options });
  }
  return new BunSpinner(options);
}

export { BunSpinner };
export * from './types.js';
export { spinners };

export default spinner;