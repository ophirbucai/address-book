/**
 * Safely gets a nested property from an object using a path string
 * @param {Object} obj The object to get the value from
 * @param {String} path The path to the property (e.g. 'user.address.city')
 * @returns {*} The value at the path or undefined if not found
 */

type NestedPaths<T> = T extends object
  ? {
      [K in keyof T]: T[K] extends object
        ? `${K & string}` | `${K & string}.${NestedPaths<T[K]>}`
        : `${K & string}`;
    }[keyof T]
  : never;

const getNestedValue = <T extends object>(obj: T, path: NestedPaths<T>) => {
  try {
    return path
      .split(".")
      .reduce(
        (current, key) =>
          (current && current[key as keyof typeof current] !== undefined
            ? current[key as keyof typeof current]
            : undefined) as T,
        obj,
      );
  } catch (e) {
    return undefined;
  }
};

/**
 * Creates a sorting function for an array of objects
 * @param {...String|Function} args Property paths to sort by (prefix with '-' for descending)
 *                                 or a mapping function
 * @returns {Function} A comparison function for Array.sort()
 */
type SortableRecord = {
  first?: string;
  last?: string;
  createdAt: string | number | Date;
  [key: string]: unknown;
};

type SortKey<T> = keyof T & string;
type SortDirection<T> = SortKey<T> | `-${SortKey<T>}`;
type MapFunction = (path: string, value: unknown) => unknown;

const sortBy = <T extends SortableRecord>(
  ...args: (SortDirection<T> | MapFunction)[]
) => {
  const properties = args.filter(
    (arg): arg is SortDirection<T> => typeof arg === "string",
  );
  const mapFn =
    args.find((arg): arg is MapFunction => typeof arg === "function") ||
    ((_, value) => value);

  const createComparator = (property: SortDirection<T>) => {
    const sortOrder = property.startsWith("-") ? -1 : 1;
    const path = property.startsWith("-")
      ? (property.slice(1) as SortKey<T>)
      : (property as SortKey<T>);

    return (a: T, b: T) => {
      const aVal = mapFn(path, getNestedValue(a, path as NestedPaths<T>));
      const bVal = mapFn(path, getNestedValue(b, path as NestedPaths<T>));

      if (aVal === bVal) return 0;
      if (aVal === undefined) return 1;
      if (bVal === undefined) return -1;
      return aVal && bVal && aVal < bVal ? -1 * sortOrder : sortOrder;
    };
  };

  return (a: T, b: T) => {
    for (const prop of properties) {
      const result = createComparator(prop)(a, b);
      if (result !== 0) return result;
    }
    return 0;
  };
};

export default sortBy;
