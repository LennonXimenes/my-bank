import {
	ConflictException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserValidator {
	constructor(
		private readonly prisma: PrismaService,
		private readonly repository: UserRepository,
	) {}

	async verifyExists(id: string) {
		const foundId = await this.repository.findById(id);

		if (!foundId) {
			throw new NotFoundException("id not found");
		}

		return foundId;
	}

	async verifyEmailExists(email: string) {
		const foundEmail = await this.repository.findByEmail(email);

		if (!foundEmail) {
			throw new NotFoundException("invalid credentials");
		}

		return foundEmail;
	}

	async validateEmail(email: string, id?: string) {
		const validateEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

		if (!validateEmail.test(email)) {
			throw new ConflictException("email not found");
		}

		const foundEmail = await this.repository.findByEmail(email);

		if (foundEmail?.id != id) {
			throw new ConflictException("email already exists");
		}
	}

	async verifyUserAccount(id: string) {
		const userAccount = await this.repository.userAccount(id);

		if (!userAccount) {
			throw new NotFoundException("user account not found");
		}

		return userAccount;
	}
}
