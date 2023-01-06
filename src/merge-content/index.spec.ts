import { expect, describe, it } from "vitest";

import mergeContent from ".";

describe("merge-content", () => {
  it("should merge content", () => {
    const data = [
      {
        path: "./src/en.lang.yaml",
        content: {
          test: "test"
        }
      },
      {
        path: "./src/deep/en.lang.yaml",
        content: {
          test2: "test2"
        }
      }
    ];

    const result = mergeContent(data);

    expect(result).toEqual({
      en: {
        src: {
          test: "test",
          deep: {
            test2: "test2"
          }
        }
      }
    });
  });

  it("should merge content with ignored", () => {
    const data = [
      {
        path: "./src/en.lang.yaml",
        content: {
          test: "test"
        }
      },
      {
        path: "./src/deep/en.lang.yaml",
        content: {
          test2: "test2"
        }
      }
    ];

    const result = mergeContent(data, ["deep"]);

    expect(result).toEqual({
      en: {
        src: {
          test: "test",
          test2: "test2"
        }
      }
    });
  });

  it("should merge content with multiple ignored", () => {
    const data = [
      {
        path: "./src/en.lang.yaml",
        content: {
          test: "test"
        }
      },
      {
        path: "./src/deep/en.lang.yaml",
        content: {
          test2: "test2"
        }
      }
    ];

    const result = mergeContent(data, ["deep", "src"]);

    expect(result).toEqual({
      en: {
        test: "test",
        test2: "test2"
      }
    });
  });

  it("should merge content with multiple ignored and multiple languages", () => {
    const data = [
      {
        path: "./src/en.lang.yaml",
        content: {
          test: "test"
        }
      },
      {
        path: "./src/deep/en.lang.yaml",
        content: {
          test2: "test2"
        }
      },
      {
        path: "./src/deep/de.lang.yaml",
        content: {
          test2: "test2"
        }
      }
    ];

    const result = mergeContent(data, ["deep", "src"]);

    expect(result).toEqual({
      en: {
        test: "test",
        test2: "test2"
      },
      de: {
        test2: "test2"
      }
    });
  });
});
