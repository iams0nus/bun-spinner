import spinner from '../../dist/index.js';

console.log('Checking TypeScript support...');

const typedSpinner = spinner({
  text: 'TypeScript test',
  color: 'cyan',
  spinner: 'dots2',
  ttl: 3000
}).start();

setTimeout(() => {
  typedSpinner.succeed('TypeScript works fine!');
  console.log('TS support confirmed');
}, 1500);