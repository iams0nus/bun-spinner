import spinner from '../../dist/index.js';

console.log('testing basic spinner stuff...');

const loadingSpin = spinner('Loading...').start();

setTimeout(() => {
  loadingSpin.succeed('Done!');
  console.log('ok basic usage works');

  console.log('trying the quick examples...');

  spinner({ text: 'Processing...', ttl: 3000 }).start();

  setTimeout(() => {
    const customSpin = spinner({
      text: 'Loading...',
      color: '#00ff00',
      spinner: 'dots2'
    }).start();

    setTimeout(() => {
      customSpin.stop();
      console.log('quick examples work too');
      process.exit(0);
    }, 2000);
  }, 3500);
}, 2000);