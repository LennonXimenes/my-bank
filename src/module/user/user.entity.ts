import { Account } from "@prisma/client";
import { BaseEntity } from "src/common/abstracts/base-entity.abstract";
import bcrypt from "bcrypt";

export class User extends BaseEntity {
	// 1. Atributos
	public name: string;
	public email: string;
	private _password: string;
	public birth_date: Date;
	public account?: Account;

	// 2. Construtor
	private constructor(
		id: string,
		name: string,
		email: string,
		password: string,
		birth_date: Date,
		account?: Account,
	) {
		super(id);
		this.name = name;
		this.email = email;
		this.setPassword(password);
		this.birth_date = birth_date;
		this.account = account;
	}

	// 3. Métodos Privados
	private async hashPassword(password: string): Promise<string> {
		const saltRounds = 10;
		return await bcrypt.hash(password, saltRounds);
	}

	private validateName(name: string): void {
		if (!name || name.trim().length < 3) {
			throw new Error("Name must be at least 3 characters long");
		}
	}

	private validateEmail(email: string): void {
		const validateEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		if (!validateEmail.test(email)) {
			throw new Error("Invalid email format");
		}
	}

	private validatePassword(password: string): void {
		const validatePassword =
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
		if (!validatePassword.test(password)) {
			throw new Error(
				"Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
			);
		}
	}

	private validateBirthDate(birth_date: Date): void {
		if (!(birth_date instanceof Date)) {
			throw new Error("Invalid birth date format");
		}
		const today = new Date();
		if (birth_date > today) {
			throw new Error("Birth date cannot be in the future");
		}
		const minAgeDate = new Date();
		minAgeDate.setFullYear(today.getFullYear() - 18);
		if (birth_date > minAgeDate) {
			throw new Error("User must be at least 18 years old");
		}
	}

	// 4. Métodos Públicos
	public async setPassword(password: string): Promise<void> {
		this.validatePassword(password);
		this._password = await this.hashPassword(password);
	}

	public getPassword(): string {
		return this._password;
	}

	public async comparePassword(password: string): Promise<boolean> {
		return await bcrypt.compare(password, this._password);
	}

	// 5. Métodos de Fábrica
	public static async create(
		id: string,
		name: string,
		email: string,
		password: string,
		birth_date: Date,
		account?: Account,
	): Promise<User> {
		const user = new User(id, name, email, password, birth_date, account);
		user.validateName(name);
		user.validateEmail(email);
		user.validateBirthDate(birth_date);
		return user;
	}
}
