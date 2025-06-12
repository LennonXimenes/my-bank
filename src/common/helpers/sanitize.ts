type tWithPassword = { password?: string };

export function sanitize<T extends tWithPassword>(data: T): Omit<T, "password">;
export function sanitize<T extends tWithPassword>(
  data: T[],
): Omit<T, "password">[];
export function sanitize<T extends tWithPassword>(data: T | T[]): any {
  if (Array.isArray(data)) {
    return data.map(({ password, ...rest }) => rest);
  }

  const { password, ...rest } = data;
  return rest;
}
