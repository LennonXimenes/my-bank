import { ConflictException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { env } from "process";
import { Generate } from "src/utils/generate.utils";
import { Validate } from "src/utils/validate.utils";

interface iUser {
	id?: string;
	name?: string;
	email?: string;
	password?: string;
	birthDate?: Date;
	createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: Date | null;
}

interface UserCreate {
	name: string;
	email: string;
	password: string;
	birthDate: Date;
}

interface UserUpdate {
	name?: string;
	email?: string;
	password?: string;
	birthDate?: Date;
}

export class UserEntity {
	id: string;
	name: string;
	email: string;
	password: string;
	birthDate: Date;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date | null;

	constructor(user: iUser) {
		if (user.id) this.id = user.id;
		if (user.name) this.setName(user.name);
		if (user.email) this.setEmail(user.email);
		if (user.password) this.setPassword(user.password);
		if (user.birthDate) this.setBirthDate(user.birthDate);
		this.createdAt = user.createdAt ?? new Date();
		this.updatedAt = user.updatedAt ?? new Date();
		this.deletedAt = user.deletedAt ?? null;
	}

	get() {
		return {
			id: this.id,
			name: this.name,
			email: this.email,
			password: this.password,
			birthDate: this.birthDate,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
			deletedAt: this.deletedAt,
		};
	}

	getId(): string {
		return this.id;
	}
	getName(): string {
		return this.name;
	}
	getEmail(): string {
		return this.email;
	}
	getPassword(): string {
		return this.password;
	}
	getBirthDate(): Date {
		return this.birthDate;
	}
	getCreatedAt(): Date {
		return this.createdAt;
	}
	getUpdatedAt(): Date {
		return this.updatedAt;
	}
	getDeletedAt(): Date {
		return this.deletedAt;
	}

	setId(): void {
		this.id = Generate.uuid();
	}
	setName(name: string): void {
		name = name.trim();
		if (name.length < 3 || name.length > 50) {
			throw new ConflictException("name must be between 3 and 50 characters");
		}
		this.name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
	}

	setEmail(email: string): void {
		email = email.toLowerCase().trim();
		if (Validate.email(email)) {
			this.email = email;
		} else {
			throw new ConflictException("email is not valid");
		}
	}
	setPassword(password: string): void {
		if (!Validate.password(password) && !Validate.uuid(password)) {
			throw new ConflictException(
				"the password must be between 8 and 50 characters long, contain at least one uppercase letter, one lowercase letter, and one special character.",
			);
		}

		const isHashed = password.startsWith("$2b$");
		this.password = isHashed
			? password
			: bcrypt.hashSync(password, Number(env.HASH_SALT));
	}

	setBirthDate(birthDate: Date): void {
		if (!(birthDate instanceof Date) || isNaN(birthDate.getTime())) {
			throw new ConflictException("Invalid birth date");
		}
		const today = new Date();
		const minAgeDate = new Date(today);
		minAgeDate.setFullYear(today.getFullYear() - 18);
		if (birthDate > today) {
			throw new ConflictException("birth date cannot be in the future");
		}
		if (birthDate > minAgeDate) {
			throw new ConflictException("user must be at least 18 years old");
		}
		this.birthDate = birthDate;
	}
	setCreatedAt(): void {
		this.createdAt = new Date();
	}
	setUpdatedAt(): void {
		this.updatedAt = new Date();
	}
	setDeletedAt(deleted: boolean): void {
		if (deleted) {
			this.deletedAt = new Date();
		} else {
			this.deletedAt = null;
		}
	}

	create(user: UserCreate): void {
		this.setId();
		this.setName(user.name);
		this.setEmail(user.email);
		this.setPassword(user.password);
		this.setBirthDate(user.birthDate);
		this.setCreatedAt();
		this.setUpdatedAt();
		this.setDeletedAt(false);
	}
	update(user: UserUpdate): void {
		this.setUpdatedAt();
		if (user.name) this.setName(user.name);
		if (user.email) this.setEmail(user.email);
		if (user.password) this.setPassword(user.password);
		if (user.birthDate) this.setBirthDate(user.birthDate);
	}
}
