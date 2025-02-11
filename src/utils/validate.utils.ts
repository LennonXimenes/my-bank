export class Validate {
	static password(password: string): boolean {
		const regex =
			/^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z])(?=.*[a-z])(?!.*(.)\1{2,}).{8,50}$/;
		return regex.test(password);
	}

	static uuid(uuid: string): boolean {
		const regex =
			/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
		return regex.test(uuid);
	}

	static email(email: string): boolean {
		const regex = /^[a-zA-Z0-9.%_+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/;
		return regex.test(email);
	}
}
