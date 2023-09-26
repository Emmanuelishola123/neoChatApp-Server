/**
 *
 * @param obj
 * @param field
 * @returns new Obj
 */
export function omit<T>(obj: T, field: keyof T | (keyof T)[]) {
  if (Array.isArray(field)) {
    const entries = Object.entries(field).filter((item) => {
      const [key] = item;

      return !field.includes(key as keyof T);
    });

    return Object.fromEntries(entries);
  }

  const { [field]: unused, ...rest } = obj;

  return rest;
}
