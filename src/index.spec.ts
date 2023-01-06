import { expect, describe, it, vi } from "vitest";
import plugin from ".";

vi.mock("fs", () => ({
  default: {
    readFileSync: () => "test: test",
    existsSync: () => true,
    rmSync: () => true,
    writeFileSync: () => true,
    mkdirSync: () => true
  }
}));

vi.mock("fast-glob", () => ({
  default: () => ["./src/en.lang.yaml"]
}));

vi.mock("path", () => ({
  default: { resolve: () => "./src/en.lang.yaml" }
}));

describe("vite-plugin-i18n-loader", () => {
  it("should load i18n files", async () => {
    const result = await plugin().load("\0virtual:i18n-loader");

    expect(result).toEqual('export const messages = {"en":{"src":{"test":"test"}}}');
  });

  it("should load i18n files with emitFiles", async () => {
    const result = await plugin({ emitFiles: true }).load("\0virtual:i18n-loader");

    expect(result).toEqual('export const messages = {"en":{"src":{"test":"test"}}}');
  });

  it("should resolve the virtual module", async () => {
    const result = await plugin().resolveId("virtual:i18n-loader");

    expect(result).toEqual("\0virtual:i18n-loader");
  });

  it("should reload on hmr", async () => {
    let reloadCalled = false;

    plugin().handleHotUpdate({
      file: "./src/en.lang.yaml",
      server: {
        reloadModule: () => {
          reloadCalled = true;
        },
        moduleGraph: {
          getModuleById: () => true
        }
      }
    } as any);

    expect(reloadCalled).toBeTruthy();
  });
});
