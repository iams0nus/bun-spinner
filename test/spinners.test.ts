import { test, expect, describe } from "bun:test";
import { spinners } from "../src/spinners.js";

describe("Spinners", () => {
  describe("Built-in spinners", () => {
    test("should have dots spinner", () => {
      expect(spinners.dots).toBeDefined();
      expect(spinners.dots.interval).toBeGreaterThan(0);
      expect(spinners.dots.frames.length).toBeGreaterThan(0);
    });

    test("should have line spinner", () => {
      expect(spinners.line).toBeDefined();
      expect(spinners.line.frames).toEqual(["-", "\\", "|", "/"]);
    });

    test("should have pipe spinner", () => {
      expect(spinners.pipe).toBeDefined();
      expect(spinners.pipe.frames).toEqual(["┤", "┘", "┴", "└", "├", "┌", "┬", "┐"]);
    });

    test("should have star spinner", () => {
      expect(spinners.star).toBeDefined();
      expect(spinners.star.frames).toEqual(["✶", "✸", "✹", "✺", "✹", "✷"]);
    });
  });


  describe("Spinner structure validation", () => {
    test("all spinners should have required properties", () => {
      Object.entries(spinners).forEach(([name, spinner]) => {
        expect(spinner).toHaveProperty("interval");
        expect(spinner).toHaveProperty("frames");
        expect(typeof spinner.interval).toBe("number");
        expect(Array.isArray(spinner.frames)).toBe(true);
        expect(spinner.interval).toBeGreaterThan(0);
        expect(spinner.frames.length).toBeGreaterThan(0);
      });
    });

    test("all frames should be non-empty strings", () => {
      Object.entries(spinners).forEach(([name, spinner]) => {
        spinner.frames.forEach((frame, index) => {
          expect(typeof frame).toBe("string");
          expect(frame.length).toBeGreaterThan(0);
        });
      });
    });

    test("intervals should be reasonable", () => {
      Object.entries(spinners).forEach(([name, spinner]) => {
        expect(spinner.interval).toBeGreaterThanOrEqual(50);
        expect(spinner.interval).toBeLessThanOrEqual(1000);
      });
    });
  });

  describe("Spinner count", () => {
    test("should have expected number of spinners", () => {
      const spinnerNames = Object.keys(spinners);
      expect(spinnerNames.length).toBeGreaterThanOrEqual(40);
    });

    test("should include core professional spinners", () => {
      const coreSpinners = ["dots", "line", "pipe", "arrow", "toggle", "circle"];
      coreSpinners.forEach(name => {
        expect(spinners).toHaveProperty(name);
      });
    });
  });
});