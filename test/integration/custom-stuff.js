import spinner from '../../dist/index.js';

console.log('Testing custom features...\n');

const worldSpinner = {
  interval: 120,
  frames: ['🌍', '🌎', '🌏']
};

console.log('1. Custom spinner with world emoji...');
const customSpin = spinner({
  text: 'Loading world data...',
  spinner: worldSpinner,
  color: [50, 150, 255] // nice blue color
}).start();

setTimeout(() => {
  customSpin.succeed('World loaded!');

  console.log('\n2. Testing dynamic text updates...');
  const updateSpin = spinner('Starting process...').start();

  setTimeout(() => {
    updateSpin.text = 'Connecting to server...';
    updateSpin.color = 'yellow';
  }, 600);

  setTimeout(() => {
    updateSpin.text = 'Downloading data...';
    updateSpin.color = [255, 100, 0];
  }, 1200);

  setTimeout(() => {
    updateSpin.text = 'Processing...';
    updateSpin.color = 'green';
  }, 1800);

  setTimeout(() => {
    updateSpin.succeed('All done!');

    console.log('\n3. Testing different completion types...');
    testCompletionTypes();
  }, 2400);
}, 1500);

function testCompletionTypes() {
  const successSpin = spinner('Success test').start();
  setTimeout(() => successSpin.succeed('Worked!'), 400);

  setTimeout(() => {
    const failSpin = spinner('Fail test').start();
    setTimeout(() => failSpin.fail('Oops!'), 400);
  }, 600);

  setTimeout(() => {
    const warnSpin = spinner('Warning test').start();
    setTimeout(() => warnSpin.warn('Be careful!'), 400);
  }, 1000);

  setTimeout(() => {
    const infoSpin = spinner('Info test').start();
    setTimeout(() => infoSpin.info('FYI'), 400);
  }, 1400);

  setTimeout(() => {
    console.log('\nCustom tests complete!');
  }, 2000);
}