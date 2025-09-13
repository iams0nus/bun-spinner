import spinner from '../../dist/index.js';

console.log('Testing colors...');

const colors = [
  { name: 'red', value: 'red' },
  { name: 'green', value: 'green' },
  { name: 'blue', value: 'blue' },
  { name: 'cyan', value: 'cyan' },
  { name: 'yellow', value: 'yellow' },
];

const hexColors = ['#ff0000', '#00ff00', '#0000ff', '#ff6b35'];
const rgbColors = [[255, 0, 0], [0, 255, 0], [138, 43, 226]];
const colorCodes = [196, 46, 21];

let currentIndex = 0;

function testNamedColors() {
  if (currentIndex < colors.length) {
    const color = colors[currentIndex];
    console.log(`Testing ${color.name}...`);

    const colorSpinner = spinner({
      text: `${color.name} spinner`,
      color: color.value
    }).start();

    setTimeout(() => {
      colorSpinner.stop();
      currentIndex++;
      setTimeout(testNamedColors, 100);
    }, 400);
  } else {
    testHexColors();
  }
}

function testHexColors() {
  console.log('\nTesting hex colors...');
  let hexIndex = 0;

  function nextHex() {
    if (hexIndex < hexColors.length) {
      const hex = hexColors[hexIndex];
      const hexSpinner = spinner({
        text: `hex ${hex}`,
        color: hex
      }).start();

      setTimeout(() => {
        hexSpinner.stop();
        hexIndex++;
        setTimeout(nextHex, 100);
      }, 300);
    } else {
      testRgbColors();
    }
  }
  nextHex();
}

function testRgbColors() {
  console.log('\nTesting RGB arrays...');
  let rgbIndex = 0;

  function nextRgb() {
    if (rgbIndex < rgbColors.length) {
      const rgb = rgbColors[rgbIndex];
      const rgbSpinner = spinner({
        text: `RGB [${rgb.join(', ')}]`,
        color: rgb
      }).start();

      setTimeout(() => {
        rgbSpinner.stop();
        rgbIndex++;
        setTimeout(nextRgb, 100);
      }, 300);
    } else {
      test256Colors();
    }
  }
  nextRgb();
}

function test256Colors() {
  console.log('\nTesting 256-color codes...');
  let codeIndex = 0;

  function nextCode() {
    if (codeIndex < colorCodes.length) {
      const code = colorCodes[codeIndex];
      const codeSpinner = spinner({
        text: `color ${code}`,
        color: code
      }).start();

      setTimeout(() => {
        codeSpinner.stop();
        codeIndex++;
        setTimeout(nextCode, 100);
      }, 300);
    } else {
      console.log('\nColor tests done!');
      process.exit(0);
    }
  }
  nextCode();
}

testNamedColors();