/**
 * Deep merge two objects.
 */
export default function deepMerge<T, U>(obj1: T, obj2: U): T & U {
  const result = {} as T & U;

  for (const prop in obj1) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj1.hasOwnProperty(prop)) {
      if (Array.isArray(obj1[prop as keyof T]) || Array.isArray(obj2[prop as unknown as keyof U])) {
        result[prop] = [
          ...((obj1[prop as keyof T] || []) as []),
          ...((obj2[prop as unknown as keyof U] || []) as [])
        ] as any;
      } else if (typeof obj1[prop as keyof T] === "object" && typeof obj2[prop as unknown as keyof U] === "object") {
        result[prop] = deepMerge(obj1[prop as keyof T], obj2[prop as unknown as keyof U]) as any;
      } else {
        result[prop] = obj1[prop as keyof T] as any;
      }
    }
  }
  for (const prop in obj2) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj2.hasOwnProperty(prop)) {
      if (Array.isArray(obj1[prop as unknown as keyof T]) || Array.isArray(obj2[prop as keyof U])) {
        result[prop] = [
          ...((obj1[prop as unknown as keyof T] || []) as []),
          ...((obj2[prop as keyof U] || []) as [])
        ] as any;
      } else if (typeof obj1[prop as unknown as keyof T] === "object" && typeof obj2[prop as keyof U] === "object") {
        result[prop] = deepMerge(obj1[prop as unknown as keyof T], obj2[prop as keyof U]) as any;
      } else {
        result[prop] = obj2[prop as keyof U] as any;
      }
    }
  }

  return result;
}
