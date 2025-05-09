import { Account } from "@prisma/client";
import { BaseEntity } from "src/common/abstracts/base-entity.abstract";
import bcrypt from "bcrypt";
import { BadRequestException } from "@nestjs/common";

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
			throw new BadRequestException("Name must be at least 3 characters long");
		}
	}

	private validateEmail(email: string): void {
		const validateEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		if (!validateEmail.test(email)) {
			throw new BadRequestException("Invalid email format");
		}
	}

	private validatePassword(password: string): void {
		const validatePassword =
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
		if (!validatePassword.test(password)) {
			throw new BadRequestException(
				"Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
			);
		}
	}

	private validateBirthDate(birth_date: string): void {
		const [day, month, year] = birth_date.split("/").map(Number);

		if (isNaN(day) || isNaN(month) || isNaN(year)) {
			throw new BadRequestException(
				"Invalid birth date format. The expected format is DD/MM/YYYY",
			);
		}

		if (month < 1 || month > 12) {
			throw new BadRequestException("Invalid month");
		}

		const daysInMonth = this.getDaysInMonth(month, year);
		if (day < 1 || day > daysInMonth) {
			throw new BadRequestException("Invalid day for the given month");
		}

		const isoString = `${year}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day}T00:00:00.000Z`;
		const formattedDate = new Date(isoString);

		if (isNaN(formattedDate.getTime())) {
			throw new BadRequestException("Invalid birth date");
		}

		const today = new Date();
		if (formattedDate > today) {
			throw new BadRequestException("Birth date cannot be in the future");
		}

		const minAgeDate = new Date();
		minAgeDate.setFullYear(today.getFullYear() - 18);
		if (formattedDate > minAgeDate) {
			throw new BadRequestException("User must be at least 18 years old");
		}
	}

	private getDaysInMonth(month: number, year: number): number {
		const monthsWith31Days = [1, 3, 5, 7, 8, 10, 12];

		const monthsWith30Days = [4, 6, 9, 11];

		if (month === 2) {
			if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
				return 29;
			} else {
				return 28;
			}
		}

		if (monthsWith31Days.includes(month)) {
			return 31;
		}

		if (monthsWith30Days.includes(month)) {
			return 30;
		}

		return 0;
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
