#!/usr/bin/env bun

import { spawn } from 'bun';
import { join } from 'path';

const testDir = import.meta.dir;

const tests = [
  'basic-usage.js',
  'real-world-scenarios.js',
  'color-test.js',
  'spinner-showcase.js',
  'ttl-timeout-test.js',
  'custom-stuff.js',
  'typescript-check.ts'
];

console.log('Running integration tests...\n');

let passed = 0;
let failed = 0;

for (const testFile of tests) {
  const testPath = join(testDir, testFile);
  console.log(`Running ${testFile}...`);

  try {
    const proc = spawn(['bun', testPath], {
      stdout: 'pipe',
      stderr: 'pipe'
    });

    const exitCode = await proc.exited;

    if (exitCode === 0) {
      console.log(`✅ ${testFile} passed\n`);
      passed++;
    } else {
      console.log(`❌ ${testFile} failed\n`);
      failed++;
    }
  } catch (err) {
    console.log(`❌ ${testFile} failed: ${err.message}\n`);
    failed++;
  }
}

console.log('\n--- Test Results ---');
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);
console.log(`Total: ${passed + failed}`);

if (failed === 0) {
  console.log('\n🎉 All tests passed!');
  process.exit(0);
} else {
  console.log('\n😞 Some tests failed');
  process.exit(1);
}