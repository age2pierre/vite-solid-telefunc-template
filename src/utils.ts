import { type ReadonlyTuple, type Split } from 'type-fest'
import { type ObjectEntry } from 'type-fest/source/entry'

export function wait<T>(ms: number, data: T): Promise<T> {
  return new Promise((resolve) => setTimeout(resolve, ms, data))
}

/**
 * Same as String.split() but with better typing
 * @category Utils
 * */
export function split<S extends string, D extends string>(
  string: S,
  separator: D,
): Split<S, D> {
  return string.split(separator) as Split<S, D>
}

/**
 * Same as Object.entries() but with better typing
 * @category Utils
 * */
export function entries<T extends object>(obj: T): Array<ObjectEntry<T>> {
  return Object.entries(obj) as Array<ObjectEntry<T>>
}

/**
 * Same as Array.includes() but with better typing
 * @category Utils
 * */
export function includes<T extends U, U>(
  coll: ReadonlyArray<T>,
  el: U,
): el is T {
  return coll.includes(el as T)
}

/**
 * Same as Object.fromEntries() but with better typing
 * @category Utils
 * */
export function fromEntries<K extends string, T>(
  entries: Iterable<readonly [K, T]>,
): { [k in K]?: T } {
  return Object.fromEntries(entries) as { [k in K]?: T }
}

/**
 * Same as Object.keys() but with better typing
 * @category Utils
 * */
export function keys<T extends object>(o: T): Array<keyof T> {
  return Object.keys(o) as Array<keyof T>
}

/**
 * Creates an array with [0 .. arraySize]
 * @category Utils
 * */
export function range(arraySize: number): number[] {
  return [...Array(arraySize).keys()]
}

/**
 * Not nullish typeguard
 * @category Utils
 * */
export function isNotNullish<T>(value: T | null | undefined): value is T {
  return value != null
}

/**
 * Compiler errors if invoked, console warns at runtime if ever reached
 * @category Utils
 * */
export function exhaustiveCheck(_param: never): void {
  const trace = new Error().stack
  console.error(
    `exhaustiveCheck : case ${_param} is not handled, trace: ${trace}`,
  )
  return
}

/**
 * Lower case the first letter of a string
 * @category Utils
 * */
export function uncapitalize<S extends string>(str: S): Uncapitalize<S> {
  return [str.at(0)?.toLocaleLowerCase(), str.slice(1)].join(
    '',
  ) as Uncapitalize<S>
}

/**
 * Upper case the first letter of a string
 * @category Utils
 * */
export function capitalize<S extends string>(str: S): Capitalize<S> {
  return [str.at(0)?.toLocaleUpperCase(), str.slice(1)].join(
    '',
  ) as Capitalize<S>
}

/**
 * Map an object by its entries (tuples key/value)
 * @category Utils
 * */
export function mapByEntries<T extends object, MappedK extends string, MappedV>(
  obj: T,
  mapper: (entry: ObjectEntry<T>) => [MappedK, MappedV],
): { [k in MappedK]: MappedV } {
  return fromEntries(entries(obj).map(mapper)) as { [k in MappedK]: MappedV }
}

/**
 * zip([a,a,..,a],[b,b,..,b]) === [[a,b],[a,b],..,[a,b]]
 * @category Utils
 */
export function zip<T extends ReadonlyArray<unknown>[]>(
  ...args: T
): { [K in keyof T]: T[K] extends (infer V)[] ? V : never }[] {
  const minLength = Math.min(...args.map((arr) => arr.length))
  return range(minLength).map((i) => args.map((arr) => arr[i])) as any
}

/**
 * Returns a floor (min) or ceiling (max) value if not in between
 * @category Utils
 * */
export function clamp(num: number, min: number, max: number): number {
  return num <= min ? min : num >= max ? max : num
}

/**
 * chunk([a,b,c,d,e], 2) === [[a,b],[c,d],[e]]
 * @category Utils
 * */
export function chunk<T, L extends number>(
  arr: Array<T>,
  size: L,
): Array<ReadonlyTuple<T, L>> {
  if (!arr.length) {
    return []
  }
  return [...[arr.slice(0, size)], ...chunk(arr.slice(size), size)] as Array<
    ReadonlyTuple<T, L>
  >
}
