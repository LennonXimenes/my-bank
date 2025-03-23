import { ConflictException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { randomUUID } from "crypto";
import e from "express";
import { env } from "process";

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

interface iUserCreate {
	name: string;
	email: string;
	password: string;
	birthDate: Date;
}

interface iUserUpdate {
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
		this.id = randomUUID();
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
		this.birthDate = new Date(birthDate);
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

	create(user: iUserCreate): void {
		this.setId();
		this.setName(user.name);
		this.setEmail(user.email);
		this.setPassword(user.password);
		this.setBirthDate(user.birthDate);
		this.setCreatedAt();
		this.setUpdatedAt();
		this.setDeletedAt(false);
	}
	update(user: iUserUpdate): void {
		this.setUpdatedAt();
		if (user.name) this.setName(user.name);
		if (user.email) this.setEmail(user.email);
		if (user.password) this.setPassword(user.password);
		if (user.birthDate) this.setBirthDate(user.birthDate);
	}
}
