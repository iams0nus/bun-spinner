import { test, expect, describe, beforeEach, afterEach } from "bun:test";
import spinner from "../src/index.js";

describe("BunSpinner class", () => {
  let mockStream: any;
  
  beforeEach(() => {
    mockStream = {
      write: (data: string) => {},
      isTTY: true
    };
  });

  afterEach(() => {
  });

  describe("Constructor and basic properties", () => {
    test("should create spinner with default options", () => {
      const spin = spinner();
      expect(spin.text).toBe("");
      expect(spin.color).toBe("cyan");
      expect(spin.indent).toBe(0);
    });

    test("should create spinner with string parameter", () => {
      const spin = spinner("Loading...");
      expect(spin.text).toBe("Loading...");
    });

    test("should create spinner with options object", () => {
      const spin = spinner({
        text: "Processing...",
        color: "red",
        indent: 2,
        spinner: "dots2"
      });
      
      expect(spin.text).toBe("Processing...");
      expect(spin.color).toBe("red");
      expect(spin.indent).toBe(2);
    });

    test("should handle TTL option", () => {
      const spin = spinner({
        text: "TTL test",
        ttl: 1000
      });
      
      expect(spin).toBeDefined();
    });
  });

  describe("Property setters", () => {
    test("should update text property", () => {
      const spin = spinner("Initial");
      spin.text = "Updated";
      expect(spin.text).toBe("Updated");
    });

    test("should update color property", () => {
      const spin = spinner({ color: "blue" });
      spin.color = "green";
      expect(spin.color).toBe("green");
    });

    test("should update indent property", () => {
      const spin = spinner({ indent: 0 });
      spin.indent = 4;
      expect(spin.indent).toBe(4);
    });
  });

  describe("Spinner types", () => {
    test("should accept built-in spinner names", () => {
      const spinnerNames = [
        "dots", "dots2", "line", "pipe", "star", 
        "arrow", "toggle", "circle"
      ];
      
      spinnerNames.forEach(name => {
        const spin = spinner({ spinner: name as any });
        expect(spin).toBeDefined();
      });
    });

    test("should accept custom spinner object", () => {
      const customSpinner = {
        interval: 100,
        frames: ["⠁", "⠂", "⠄"]
      };
      
      const spin = spinner({ spinner: customSpinner });
      expect(spin).toBeDefined();
    });

    test("should fallback to dots for invalid spinner name", () => {
      const spin = spinner({ spinner: "nonexistent" as any });
      expect(spin).toBeDefined();
    });
  });

  describe("Color support", () => {
    test("should accept standard colors", () => {
      const colors = [
        "black", "red", "green", "yellow", "blue", 
        "magenta", "cyan", "white", "gray"
      ];
      
      colors.forEach(color => {
        const spin = spinner({ color: color as any });
        expect(spin.color).toBe(color);
      });
    });

    test("should accept bright colors", () => {
      const brightColors = [
        "redBright", "greenBright", "yellowBright", 
        "blueBright", "magentaBright", "cyanBright"
      ];
      
      brightColors.forEach(color => {
        const spin = spinner({ color: color as any });
        expect(spin.color).toBe(color);
      });
    });
  });

  describe("Method chaining", () => {
    test("should support method chaining", () => {
      const spin = spinner("Test");
      const result = spin.start().stop();
      expect(result).toBe(spin);
    });

    test("should chain succeed method", () => {
      const spin = spinner("Test");
      const result = spin.succeed("Success!");
      expect(result).toBe(spin);
    });

    test("should chain fail method", () => {
      const spin = spinner("Test");
      const result = spin.fail("Failed!");
      expect(result).toBe(spin);
    });

    test("should chain warn method", () => {
      const spin = spinner("Test");
      const result = spin.warn("Warning!");
      expect(result).toBe(spin);
    });

    test("should chain info method", () => {
      const spin = spinner("Test");
      const result = spin.info("Info!");
      expect(result).toBe(spin);
    });
  });

  describe("Stream support", () => {
    test("should accept Bun.stdout stream", () => {
      const spin = spinner({
        text: "stdout test",
        stream: Bun.stdout
      });
      expect(spin).toBeDefined();
    });

    test("should accept Bun.stderr stream", () => {
      const spin = spinner({
        text: "stderr test", 
        stream: Bun.stderr
      });
      expect(spin).toBeDefined();
    });
  });

  describe("Elapsed time", () => {
    test("should return 0 before starting", () => {
      const spin = spinner("Test");
      expect(spin.elapsedTime).toBe(0);
    });

    test("should track elapsed time after starting", async () => {
      const spin = spinner({
        text: "Test",
        stream: mockStream
      });

      // Mock isEnabled to return true for this test
      Object.defineProperty(spin, 'isEnabled', { get: () => true });

      const startTime = Date.now();
      spin.start();

      await new Promise(resolve => setTimeout(resolve, 100));

      const elapsed = spin.elapsedTime;
      const actualElapsed = Date.now() - startTime;

      expect(elapsed).toBeGreaterThan(50);
      expect(elapsed).toBeLessThanOrEqual(actualElapsed + 50); // Allow some tolerance
      spin.stop();
    });
  });
});