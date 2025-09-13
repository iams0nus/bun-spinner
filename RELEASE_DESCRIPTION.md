# bun-spinner v1.0.0 - Lightweight Terminal Spinner for Bun.js

**Lightweight terminal spinner for Bun.js - 50+ animations, auto-timeout, advanced colors, zero dependencies.**

## Why bun-spinner?

Built specifically for the Bun ecosystem with native performance optimizations. Designed for Bun's unique capabilities:

- **Zero dependencies** - Lightweight and secure
- **Native Bun integration** - Uses Bun's built-in APIs (Bun.stdout, Bun.stderr)
- **TypeScript ready** - Full TypeScript support with Bun types
- **TTL Support** - Automatically stop spinners after specified time
- **50+ animations** - Rich collection of built-in spinner styles
- **Chainable API** - Fluent, intuitive method chaining

*Note: bun-spinner is designed specifically for Bun users who want native integration and TTL features.*

## Installation

```bash
# Install as dependency
bun add bun-spinner

# Or use with bunx (no installation required)
bunx bun-spinner
```

## Key Features

### TTL Auto-timeout
```javascript
// Auto-stop after 3 seconds
spinner({ text: 'Processing...', ttl: 3000 }).start();
```

### 50+ Built-in Animations
From simple dots to complex geometric shapes:
- **Dots Family**: `dots`, `dots2`, `dots3`, `dots4`, `dots5`, `dots6`, `dots7`, `dots8`, `dots9`, `dots10`, `dots11`, `dots12`
- **Lines & Pipes**: `line`, `line2`, `pipe`
- **Stars & Symbols**: `star`, `star2`, `flip`, `hamburger`
- **Growth Animations**: `growVertical`, `growHorizontal`
- **Geometric Shapes**: `triangle`, `arc`, `circle`, `squareCorners`, `circleQuarters`, `circleHalves`
- **Toggle Animations**: `toggle`, `toggle2` through `toggle13`
- **Arrows**: `arrow`, `arrow2`, `arrow3`
- **Advanced**: `bouncingBar`, `bouncingBall`, `noise`, `bounce`, `boxBounce`, `balloon`

### Advanced Color System
```javascript
// Named colors
spinner({ color: 'cyan' })

// 256-color palette
spinner({ color: 196 })

// Hex colors
spinner({ color: '#00ff00' })

// RGB arrays
spinner({ color: [255, 165, 0] })
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

## Complete API

**Methods**: `.start()`, `.stop()`, `.succeed()`, `.fail()`, `.warn()`, `.info()`, `.clear()`, `.stopAndPersist()`

**Properties**: `.text`, `.color`, `.indent`, `.isEnabled`, `.elapsedTime`

**Options**: `text`, `spinner`, `color`, `ttl`, `stream`, `hideCursor`, `indent`, `interval`, `discardStdin`

## Performance

Built specifically for Bun.js with:
- Zero Node.js dependencies
- Native Bun APIs (`Bun.stdout`, `Bun.stderr`, `Bun.env`)
- Optimized for Bun's runtime characteristics
- TypeScript-first with Bun types

## Requirements

- Bun.js >= 1.0.0

---

**Perfect for Bun developers who want a native, lightweight spinner solution with auto-timeout capabilities and extensive customization options.**