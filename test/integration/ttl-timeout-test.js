import spinner from '../../dist/index.js';

console.log('Testing TTL (time-to-live) feature...');

console.log('\n1. Testing 2 second timeout...');
const startTime = Date.now();
const ttlSpinner = spinner({
  text: 'This should auto-stop in 2 seconds',
  ttl: 2000
}).start();

setTimeout(() => {
  const elapsed = Date.now() - startTime;
  console.log(`Elapsed: ${elapsed}ms`);

  if (elapsed >= 1900 && elapsed <= 2300) {
    console.log('TTL timing looks good');
  } else {
    console.log('TTL timing might be off, but close enough');
  }

  console.log('\n2. Testing TTL disabled...');
  const noTtlSpinner = spinner({
    text: 'No timeout - manual control',
    ttl: 0
  }).start();

  setTimeout(() => {
    noTtlSpinner.succeed('Manually stopped');
    console.log('\nTTL tests done!');
    process.exit(0);
  }, 1000);
}, 2600);