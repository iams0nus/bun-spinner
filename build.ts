#!/usr/bin/env bun

console.log("🔨 Building bun-spinner with Bun...");

import { existsSync, rmSync, mkdirSync } from "fs";

// Clean dist directory
if (existsSync("dist")) {
  rmSync("dist", { recursive: true });
}
mkdirSync("dist", { recursive: true });

// Build with Bun
const buildResult = await Bun.build({
  entrypoints: ["./src/index.ts"],
  outdir: "./dist",
  target: "bun",
  format: "esm",
  sourcemap: "external",
  minify: false,
});

if (!buildResult.success) {
  console.error("❌ Build failed:");
  for (const message of buildResult.logs) {
    console.error(message);
  }
  process.exit(1);
}

// Generate TypeScript declarations using bunx tsc
import { spawn } from "bun";
const tscProcess = spawn(["bunx", "tsc", "--emitDeclarationOnly"], {
  stdio: ["inherit", "inherit", "inherit"],
});

await tscProcess.exited;

console.log("✅ Build completed successfully!");
console.log("📦 Built for Bun.js runtime with TypeScript declarations");