import { test, expect, describe } from "bun:test";
import { colorize, symbols } from "../src/colors.js";

describe("Colors", () => {
  describe("colorize function", () => {
    test("should add ANSI color codes", () => {
      const result = colorize("test", "red");
      expect(result).toContain("\u001b[31m");
      expect(result).toContain("test");
      expect(result).toContain("\u001b[39m");
    });

    test("should handle all standard colors", () => {
      const colors = [
        "black", "red", "green", "yellow", "blue", 
        "magenta", "cyan", "white", "gray"
      ];
      
      colors.forEach(color => {
        const result = colorize("test", color as any);
        expect(result).toContain("test");
        expect(result).toContain("\u001b[");
      });
    });

    test("should handle bright colors", () => {
      const brightColors = [
        "blackBright", "redBright", "greenBright", "yellowBright",
        "blueBright", "magentaBright", "cyanBright", "whiteBright"
      ];
      
      brightColors.forEach(color => {
        const result = colorize("test", color as any);
        expect(result).toContain("test");
        expect(result).toContain("\u001b[9"); // Bright colors start with 9x
      });
    });

    test("should handle empty string", () => {
      const result = colorize("", "red");
      expect(result).toContain("\u001b[31m");
      expect(result).toContain("\u001b[39m");
    });

    test("should handle special characters", () => {
      const result = colorize("🎉 Test! @#$%", "green");
      expect(result).toContain("🎉 Test! @#$%");
      expect(result).toContain("\u001b[32m");
    });

    test("should handle gray/grey alias", () => {
      const grayResult = colorize("test", "gray");
      const greyResult = colorize("test", "grey");
      expect(grayResult).toBe(greyResult);
    });
  });

  describe("Symbols", () => {
    test("should have all required symbols", () => {
      expect(symbols).toHaveProperty("info");
      expect(symbols).toHaveProperty("success");
      expect(symbols).toHaveProperty("warning");
      expect(symbols).toHaveProperty("error");
    });

    test("symbols should be non-empty strings", () => {
      Object.values(symbols).forEach(symbol => {
        expect(typeof symbol).toBe("string");
        expect(symbol.length).toBeGreaterThan(0);
      });
    });

    test("should have expected symbol values", () => {
      expect(symbols.info).toBe("❯");
      expect(symbols.success).toBe("✔");
      expect(symbols.warning).toBe("⚠");
      expect(symbols.error).toBe("✖");
    });
  });

  describe("Color code validation", () => {
    test("red should use code 31", () => {
      const result = colorize("test", "red");
      expect(result).toContain("\u001b[31m");
    });

    test("green should use code 32", () => {
      const result = colorize("test", "green");
      expect(result).toContain("\u001b[32m");
    });

    test("blue should use code 34", () => {
      const result = colorize("test", "blue");
      expect(result).toContain("\u001b[34m");
    });

    test("bright red should use code 91", () => {
      const result = colorize("test", "redBright");
      expect(result).toContain("\u001b[91m");
    });

    test("all colors should reset to 39", () => {
      const colors = ["red", "green", "blue", "yellow", "cyan", "magenta"];
      colors.forEach(color => {
        const result = colorize("test", color as any);
        expect(result).toContain("\u001b[39m");
      });
    });
  });

  describe("Extended color support", () => {
    test("should handle 256-color codes", () => {
      const result = colorize("test", 196);
      expect(result).toContain("\u001b[38;5;196m");
      expect(result).toContain("test");
      expect(result).toContain("\u001b[39m");
    });

    test("should handle hex color codes", () => {
      const result = colorize("test", "#ff0000");
      expect(result).toContain("\u001b[38;2;255;0;0m");
      expect(result).toContain("test");
      expect(result).toContain("\u001b[39m");
    });

    test("should handle hex color codes without hash", () => {
      const result = colorize("test", "00ff00");
      expect(result).toContain("\u001b[39m");
    });

    test("should handle RGB array colors", () => {
      const result = colorize("test", [255, 128, 0]);
      expect(result).toContain("\u001b[38;2;255;128;0m");
      expect(result).toContain("test");
      expect(result).toContain("\u001b[39m");
    });

    test("should handle invalid 256-color codes", () => {
      const result = colorize("test", 300);
      expect(result).toContain("\u001b[39m");
    });

    test("should handle invalid hex codes", () => {
      const result = colorize("test", "#gggggg");
      expect(result).toContain("\u001b[39m");
    });

    test("should handle invalid RGB values", () => {
      const result = colorize("test", [300, 128, 0]);
      expect(result).toContain("\u001b[39m");
    });

    test("should handle RGB array with wrong length", () => {
      const result = colorize("test", [255, 128] as any);
      expect(result).toContain("\u001b[39m");
    });
  });
});