import spinner from '../../dist/index.js';

console.log('Trying out different spinners...\n');

const spinnersToTry = [
  'dots', 'dots2', 'dots3', 'line', 'pipe',
  'star', 'flip', 'hamburger', 'growVertical',
  'balloon', 'bounce', 'triangle', 'arc',
  'circle', 'toggle', 'arrow', 'bouncingBar'
];

let currentSpinnerIndex = 0;

function tryNextSpinner() {
  if (currentSpinnerIndex < spinnersToTry.length) {
    const spinnerName = spinnersToTry[currentSpinnerIndex];
    console.log(`Trying ${spinnerName}...`);

    const testSpinner = spinner({
      text: `${spinnerName} animation`,
      spinner: spinnerName
    }).start();

    setTimeout(() => {
      testSpinner.stop();
      currentSpinnerIndex++;
      setTimeout(tryNextSpinner, 150);
    }, 800);
  } else {
    testChaining();
  }
}

function testChaining() {
  console.log('\nTesting chainable methods...');

  spinner('Chain test').start().succeed('Chaining works!');

  setTimeout(() => {
    const updateSpinner = spinner('Testing updates...').start();

    setTimeout(() => {
      updateSpinner.warn('Got a warning');
      console.log('\nSpinner showcase complete!');
      process.exit(0);
    }, 800);
  }, 1000);
}

tryNextSpinner();