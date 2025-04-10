import { ConflictException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { randomUUID } from "crypto";
import { env } from "process";

export interface iUser {
	id?: string;
	name?: string;
	email?: string;
	password?: string;
	birth_date?: Date;
	created_at?: Date;
	updated_at?: Date;
	deleted_at?: Date | null;
}

interface iUserCreate {
	name: string;
	email: string;
	password: string;
	birth_date: Date;
}

interface iUserUpdate {
	name?: string;
	email?: string;
	password?: string;
	birth_date?: Date;
}

export class UserEntity {
	id: string;
	name: string;
	email: string;
	password: string;
	birth_date: Date;
	created_at: Date;
	updated_at: Date;
	deleted_at: Date | null;

	constructor(user: iUser) {
		this.id = user.id ?? randomUUID();
		if (user.name) this.setName(user.name);
		if (user.email) this.setEmail(user.email);
		if (user.password) this.setPassword(user.password);
		if (user.birth_date) this.setBirthDate(user.birth_date);
		this.created_at = user.created_at ?? new Date();
		this.updated_at = user.updated_at ?? new Date();
		this.deleted_at = user.deleted_at ?? null;
	}

	get() {
		return {
			id: this.id,
			name: this.name,
			email: this.email,
			password: this.password,
			birthDate: this.birth_date,
			createdAt: this.created_at,
			updatedAt: this.updated_at,
			deletedAt: this.deleted_at,
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
		return this.birth_date;
	}
	getCreatedAt(): Date {
		return this.created_at;
	}
	getUpdatedAt(): Date {
		return this.updated_at;
	}
	getDeletedAt(): Date {
		return this.deleted_at;
	}

	setId(): void {
		this.id = randomUUID();
	}
	setName(name: string): void {
		name = name.trim();
		if (name?.length < 3 || name?.length > 50) {
			throw new ConflictException("name must be between 3 and 50 characters");
		}
		this.name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
	}

	setEmail(email: string): void {
		email = email.toLowerCase().trim();
		this.email = email;
	}
	setPassword(password: string): void {
		const validatePass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,50}$/;
		if (!validatePass.test(password)) {
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
		this.birth_date = birthDate;
	}
	setCreatedAt(): void {
		this.created_at = new Date();
	}
	setUpdatedAt(): void {
		this.updated_at = new Date();
	}
	setDeletedAt(deleted: boolean): void {
		if (deleted) {
			this.deleted_at = new Date();
		} else {
			this.deleted_at = null;
		}
	}

	create(user: iUserCreate): void {
		this.setId();
		this.setName(user.name);
		this.setEmail(user.email);
		this.setPassword(user.password);
		this.setBirthDate(user.birth_date);
		this.setCreatedAt();
		this.setUpdatedAt();
		this.setDeletedAt(false);
	}
	update(user: iUserUpdate): void {
		this.setUpdatedAt();
		if (user.name) this.setName(user.name);
		if (user.email) this.setEmail(user.email);
		if (user.password) this.setPassword(user.password);
		if (user.birth_date) this.setBirthDate(user.birth_date);
	}
}
