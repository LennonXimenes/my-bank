type WithPassword = { password?: string };

export function sanitize<T extends WithPassword>(data: T): Omit<T, "password">;
export function sanitize<T extends WithPassword>(
	data: T[],
): Omit<T, "password">[];
export function sanitize<T extends WithPassword>(data: T | T[]): any {
	if (Array.isArray(data)) {
		return data.map(({ password, ...rest }) => rest);
	}

	const { password, ...rest } = data;
	return rest;
}
