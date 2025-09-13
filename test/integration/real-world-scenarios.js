import spinner from '../../dist/index.js';

console.log('Testing real world scenarios...\n');

async function buildProject() {
  const buildSpinner = spinner('Building project...').start();

  await new Promise(resolve => setTimeout(resolve, 1500));

  buildSpinner.succeed('Build complete!');
}

function installDeps() {
  return new Promise((resolve) => {
    const installSpinner = spinner({
      text: 'Installing dependencies...',
      ttl: 5000,
      color: 'yellow'
    }).start();

    setTimeout(() => {
      installSpinner.succeed('Dependencies installed');
      resolve();
    }, 2000);
  });
}

async function deploy() {
  const deploySpinner = spinner({
    text: 'Deploying to production...',
    color: 'cyan',
    spinner: 'dots2'
  }).start();

  try {
    await new Promise(resolve => setTimeout(resolve, 1800));
    deploySpinner.succeed('Deployed successfully!');
  } catch (error) {
    deploySpinner.fail('Deployment failed');
  }
}

function runTests() {
  return new Promise((resolve) => {
    const testSpinner = spinner('Running tests...').start();

    setTimeout(() => {
      testSpinner.text = 'Running unit tests...';
    }, 500);

    setTimeout(() => {
      testSpinner.text = 'Running integration tests...';
      testSpinner.color = 'blue';
    }, 1000);

    setTimeout(() => {
      testSpinner.warn('1 test warning found');
      resolve();
    }, 1500);
  });
}

(async () => {
  console.log('1. Building project...');
  await buildProject();

  console.log('\n2. Installing dependencies...');
  await installDeps();

  console.log('\n3. Deploying...');
  await deploy();

  console.log('\n4. Running tests...');
  await runTests();

  console.log('\nAll scenarios completed!');
})();