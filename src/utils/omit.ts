export function omit<T extends object, K extends keyof T>(obj: T, keys: K[]) {
  const entries = Object.entries(obj).filter(
    ([key]) => !keys.includes(key as K)
  )

  return Object.fromEntries(entries) as Omit<T, K>
}
