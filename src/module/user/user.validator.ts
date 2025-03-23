import {
	BadRequestException,
	ConflictException,
	Injectable,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import e from "express";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserValidator {
	constructor(
		private readonly prisma: PrismaService,
		private readonly repository: UserRepository,
	) {}

	async validateBirthDate(birthDate: Date) {
		if (!birthDate) {
			throw new BadRequestException("birthDate is required");
		}

		const today = new Date();
		const minAgeDate = new Date(today);
		minAgeDate.setFullYear(today.getFullYear() - 18);

		const [day, month, year] = String(birthDate).split("/");
		const formattedDate = new Date(`${year}-${month}-${day}T00:00:00.000Z`);

		if (formattedDate > today) {
			throw new ConflictException("birth date cannot be in the future");
		}
		if (formattedDate > minAgeDate) {
			throw new ConflictException("user must be at least 18 years old");
		}

		if (isNaN(formattedDate.getTime())) {
			throw new BadRequestException("invalid birthDate format, use DD/MM/YYYY");
		}

		return formattedDate;
	}

	async validateEmail(email: string) {
		const foundEmail = await this.repository.findByEmail(email);

		if (foundEmail) {
			throw new ConflictException("email already exists");
		}

		const validateEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		if (validateEmail.test(email)) {
			return email;
		} else {
			throw new ConflictException("email is not valid");
		}
	}
}
