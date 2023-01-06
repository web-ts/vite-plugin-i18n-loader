import { expect, describe, it } from "vitest";

import deepMerge from ".";

describe("deep-merge", () => {
  it("should merge two objects", () => {
    const obj1 = {
      a: 1,
      b: 2,
      c: {
        d: 3,
        e: 4
      }
    };

    const obj2 = {
      a: 5,
      c: {
        d: 6
      }
    };

    const result = deepMerge(obj1, obj2);

    expect(result).toEqual({
      a: 5,
      b: 2,
      c: {
        d: 6,
        e: 4
      }
    });
  });

  it("should merge two objects with arrays", () => {
    const obj1 = {
      a: 1,
      b: 2,
      c: {
        d: 3,
        e: 4,
        f: [4, 5, 6]
      }
    };

    const obj2 = {
      a: 5,
      c: {
        d: 6,
        f: [1, 2, 3]
      }
    };

    const result = deepMerge(obj1, obj2);

    expect(result).toEqual({
      a: 5,
      b: 2,
      c: {
        d: 6,
        e: 4,
        f: [4, 5, 6, 1, 2, 3]
      }
    });
  });

  it("should merge two objects with arrays and objects", () => {
    const obj1 = {
      a: 1,
      b: 2,
      c: 3,
      d: {
        a: 1,
        b: 2,
        c: 3
      },
      e: [1, 2, 3],
      f: [
        {
          a: 1,
          b: 2,
          c: 3
        }
      ]
    };
    const obj2 = {
      b: 4,
      c: 5,
      d: {
        b: 4,
        c: 5,
        d: 6
      },
      e: [4, 5, 6],
      f: [
        {
          b: 4,
          c: 5,
          d: 6
        }
      ],
      g: 6
    };
    const expected = {
      a: 1,
      b: 4,
      c: 5,
      d: {
        a: 1,
        b: 4,
        c: 5,
        d: 6
      },
      e: [1, 2, 3, 4, 5, 6],
      f: [
        {
          a: 1,
          b: 2,
          c: 3
        },
        {
          b: 4,
          c: 5,
          d: 6
        }
      ],
      g: 6
    };
    const actual = deepMerge(obj1, obj2);

    expect(actual).toEqual(expected);
  });

  it("should merge two objects with arrays and objects", () => {
    const obj1 = {
      a: 1,
      b: 2,
      c: 3,
      d: {
        a: 1,
        b: 2,
        c: 3
      },
      e: [1, 2, 3],
      f: [
        {
          a: 1,
          b: 2,
          c: 3
        }
      ]
    };
    const obj2 = {
      b: 4,
      c: 5,
      d: {
        b: 4,
        c: 5,
        d: 6
      },
      e: [4, 5, 6],
      f: [
        {
          b: 4,
          c: 5,
          d: 6
        }
      ],
      g: 6
    };
    const expected = {
      a: 1,
      b: 4,
      c: 5,
      d: {
        a: 1,
        b: 4,
        c: 5,
        d: 6
      },
      e: [1, 2, 3, 4, 5, 6],
      f: [
        {
          a: 1,
          b: 2,
          c: 3
        },
        {
          b: 4,
          c: 5,
          d: 6
        }
      ],
      g: 6
    };
    const actual = deepMerge(obj1, obj2);

    expect(actual).toEqual(expected);
  });
});
