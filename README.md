# bun-spinner

TTL-based terminal spinner package optimized for Bun.js runtime.

## Installation

```bash
# Install as dependency
bun add bun-spinner

# Or use with bunx (no installation required)
bunx bun-spinner
```

## Usage

Create beautiful terminal spinners with TTL support, works seamlessly in Bun projects:

```javascript
import spinner from 'bun-spinner';

const spin = spinner('Loading...').start();
setTimeout(() => spin.succeed('Done!'), 2000);
```

### Quick Examples
```javascript
// Auto-stop after 3 seconds
spinner({ text: 'Processing...', ttl: 3000 }).start();

// Custom colors and animations
spinner({ text: 'Loading...', color: '#00ff00', spinner: 'dots2' }).start();
```

## Why bun-spinner?

Built specifically for the Bun ecosystem with native performance optimizations. Designed for Bun's unique capabilities:

- **Zero dependencies** - Lightweight and secure
- **Native Bun integration** - Uses Bun's built-in APIs (Bun.stdout, Bun.stderr)
- **TypeScript ready** - Full TypeScript support with Bun types
- **TTL Support** - Automatically stop spinners after specified time
- **50+ animations** - Rich collection of built-in spinner styles
- **Chainable API** - Fluent, intuitive method chaining

*Note: bun-spinner is designed specifically for Bun users who want native integration and TTL features.*


## Examples

### Basic Usage
```javascript
// TTL auto-stop
spinner({ text: 'Building project...', ttl: 5000 }).start();

// Custom styling
spinner({ text: 'Running tests...', color: 'cyan', spinner: 'dots2' }).start();
```

### Promise Integration
```javascript
async function deploy() {
  const spin = spinner('Deploying to production...').start();
  try {
    await deployApp();
    spin.succeed('Deployed successfully!');
  } catch (error) {
    spin.fail('Deployment failed');
  }
}
```

### Dynamic Updates
```javascript
const spin = spinner('Initializing...').start();
setTimeout(() => {
  spin.text = 'Loading modules...';
  spin.color = 'yellow';
}, 1000);
```

### Custom Spinners
```javascript
const customSpinner = {
  interval: 100,
  frames: ['🌍', '🌎', '🌏']
};

spinner({
  text: 'Loading world...',
  spinner: customSpinner,
  color: [0, 100, 255]
}).start();
```

## All Available Spinners

### Dots Family
```javascript
spinner({ spinner: 'dots' })      // ⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏
spinner({ spinner: 'dots2' })     // ⣾⣽⣻⢿⡿⣟⣯⣷
spinner({ spinner: 'dots3' })     // ⠋⠙⠚⠞⠖⠦⠴⠲⠳⠓
spinner({ spinner: 'dots4' })     // ⠄⠆⠇⠋⠙⠸⠰⠠⠰⠸⠙⠋⠇⠆
spinner({ spinner: 'dots5' })     // ⠋⠙⠚⠒⠂⠂⠒⠲⠴⠦⠖⠒⠐⠐⠒⠓⠋
spinner({ spinner: 'dots6' })     // ⠁⠉⠙⠚⠒⠂⠂⠒⠲⠴⠤⠄⠄⠤⠴⠲⠒⠂⠂⠒⠚⠙⠉⠁
spinner({ spinner: 'dots7' })     // ⠈⠉⠋⠓⠒⠐⠐⠒⠖⠦⠤⠠⠠⠤⠦⠖⠒⠐⠐⠒⠓⠋⠉⠈
spinner({ spinner: 'dots8' })     // ⠁⠁⠉⠙⠚⠒⠂⠂⠒⠲⠴⠤⠄⠄⠤⠠⠠⠤⠦⠖⠒⠐⠐⠒⠓⠋⠉⠈⠈
spinner({ spinner: 'dots9' })     // ⢹⢺⢼⣸⣇⡧⡗⡏
spinner({ spinner: 'dots10' })    // ⢄⢂⢁⡁⡈⡐⡠
spinner({ spinner: 'dots11' })    // ⠁⠂⠄⡀⢀⠠⠐⠈
spinner({ spinner: 'dots12' })    // Complex braille sequence
```

### Lines and Pipes
```javascript
spinner({ spinner: 'line' })      // -\|/
spinner({ spinner: 'line2' })     // ⠂-–—–-
spinner({ spinner: 'pipe' })      // ┤┘┴└├┌┬┐
```

### Simple Dots
```javascript
spinner({ spinner: 'simpleDots' })          // .  .. ... 
spinner({ spinner: 'simpleDotsScrolling' }) // .  .. ... .. . 
```

### Stars and Symbols
```javascript
spinner({ spinner: 'star' })      // ✶✸✹✺✹✷
spinner({ spinner: 'star2' })     // +x*
spinner({ spinner: 'flip' })      // _--`'´-_
spinner({ spinner: 'hamburger' }) // ☱☲☴
```

### Growth Animations
```javascript
spinner({ spinner: 'growVertical' })   // ▁▃▄▅▆▇▆▅▄▃
spinner({ spinner: 'growHorizontal' }) // ▏▎▍▌▋▊▉▊▋▌▍▎
```

### Balloons and Bouncing
```javascript
spinner({ spinner: 'balloon' })     // .oO@* 
spinner({ spinner: 'balloon2' })    // .oO°Oo.
spinner({ spinner: 'bounce' })      // ⠁⠂⠄⠂
spinner({ spinner: 'boxBounce' })   // ▖▘▝▗
spinner({ spinner: 'boxBounce2' })  // ▌▀▐▄
```

### Geometric Shapes
```javascript
spinner({ spinner: 'triangle' })       // ◢◣◤◥
spinner({ spinner: 'arc' })            // ◜◠◝◞◡◟
spinner({ spinner: 'circle' })         // ◡⊙◠
spinner({ spinner: 'squareCorners' })  // ◰◳◲◱
spinner({ spinner: 'circleQuarters' }) // ◴◷◶◵
spinner({ spinner: 'circleHalves' })   // ◐◓◑◒
spinner({ spinner: 'squish' })         // ╫╪
```

### Toggle Animations
```javascript
spinner({ spinner: 'toggle' })   // ⊶⊷
spinner({ spinner: 'toggle2' })  // ▫▪
spinner({ spinner: 'toggle3' })  // □■
spinner({ spinner: 'toggle4' })  // ■□▪▫
spinner({ spinner: 'toggle5' })  // ▮▯
spinner({ spinner: 'toggle6' })  // ဝ၀
spinner({ spinner: 'toggle7' })  // ⦾⦿
spinner({ spinner: 'toggle8' })  // ◍◌
spinner({ spinner: 'toggle9' })  // ◉◎
spinner({ spinner: 'toggle10' }) // ㊂㊀㊁
spinner({ spinner: 'toggle11' }) // ⧇⧆
spinner({ spinner: 'toggle12' }) // ☗☖
spinner({ spinner: 'toggle13' }) // =*-
```

### Arrows
```javascript
spinner({ spinner: 'arrow' })  // ←↖↑↗→↘↓↙
spinner({ spinner: 'arrow2' }) // ⬆️↗️➡️↘️⬇️↙️⬅️↖️
spinner({ spinner: 'arrow3' }) // ▹▹▹▹▹ ▸▹▹▹▹ ▹▸▹▹▹ etc.
```

### Advanced Animations
```javascript
spinner({ spinner: 'bouncingBar' })  // [    ] [=   ] [==  ] [=== ] etc.
spinner({ spinner: 'bouncingBall' }) // ( ●    ) (  ●   ) (   ●  ) etc.
spinner({ spinner: 'noise' })        // ▓▒░
```

## Color Support

### Named Colors
```javascript
// Standard colors
spinner({ color: 'black' })     // Black text
spinner({ color: 'red' })       // Red text
spinner({ color: 'green' })     // Green text
spinner({ color: 'yellow' })    // Yellow text
spinner({ color: 'blue' })      // Blue text
spinner({ color: 'magenta' })   // Magenta text
spinner({ color: 'cyan' })      // Cyan text
spinner({ color: 'white' })     // White text
spinner({ color: 'gray' })      // Gray text (or 'grey')

// Bright colors
spinner({ color: 'redBright' })     // Bright red
spinner({ color: 'greenBright' })   // Bright green
spinner({ color: 'yellowBright' })  // Bright yellow
spinner({ color: 'blueBright' })    // Bright blue
spinner({ color: 'magentaBright' }) // Bright magenta
spinner({ color: 'cyanBright' })    // Bright cyan
spinner({ color: 'whiteBright' })   // Bright white
```

### 256-Color Palette (0-255)
```javascript
spinner({ color: 196 })  // Bright red
spinner({ color: 46 })   // Bright green
spinner({ color: 21 })   // Bright blue
spinner({ color: 208 })  // Orange
spinner({ color: 129 })  // Purple
spinner({ color: 226 })  // Yellow
spinner({ color: 82 })   // Lime green
spinner({ color: 202 })  // Dark orange
```

### Hex Colors
```javascript
spinner({ color: '#ff0000' })  // Red
spinner({ color: '#00ff00' })  // Green
spinner({ color: '#0000ff' })  // Blue
spinner({ color: '#ff6b35' })  // Orange
spinner({ color: '#4ecdc4' })  // Teal
spinner({ color: '#45b7d1' })  // Sky blue
spinner({ color: '#f9ca24' })  // Golden
spinner({ color: '#6c5ce7' })  // Purple
```

### RGB Arrays
```javascript
spinner({ color: [255, 0, 0] })     // Red
spinner({ color: [255, 165, 0] })   // Orange
spinner({ color: [75, 0, 130] })    // Indigo
spinner({ color: [255, 20, 147] })  // Deep pink
spinner({ color: [0, 255, 127] })   // Spring green
spinner({ color: [138, 43, 226] })  // Blue violet
```

## Requirements

- Bun.js >= 1.0.0

## API

### spinner(options)

Creates a new spinner instance.

#### Options
```javascript
{
  text: 'Loading...',              // Text to display
  spinner: 'dots',                 // Spinner animation name or custom object
  color: 'cyan',                   // Color (name, number, hex, or RGB array)
  ttl: 0,                         // Auto-stop after milliseconds (0 = disabled)
  stream: Bun.stderr,             // Output stream (Bun.stdout or Bun.stderr)
  hideCursor: true,               // Hide cursor while spinning
  indent: 0,                      // Indentation spaces
  interval: 0,                    // Override spinner interval
  discardStdin: true              // Discard stdin while spinning
}
```

#### Methods
- `.start([text])` — Start spinning
- `.stop()` — Stop and clear
- `.succeed([text])` — Stop with success symbol ✔
- `.fail([text])` — Stop with error symbol ✖
- `.warn([text])` — Stop with warning symbol ⚠
- `.info([text])` — Stop with info symbol ❯
- `.clear()` — Clear without stopping
- `.stopAndPersist(opts)` — Stop with custom symbol

#### Properties
- `.text` — Get/set spinner text
- `.color` — Get/set spinner color
- `.indent` — Get/set indentation
- `.isEnabled` — Returns true if TTY and not CI
- `.elapsedTime` — Milliseconds since start

## Performance

Built specifically for Bun.js with:
- Zero Node.js dependencies
- Native Bun APIs (`Bun.stdout`, `Bun.stderr`, `Bun.env`)
- Optimized for Bun's runtime characteristics
- TypeScript-first with Bun types

## License

MIT