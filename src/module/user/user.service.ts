import { Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { UserValidator } from "./user.validator";
import { CreateUserDto } from "./create.dto";

@Injectable()
export class UserService {
	constructor(
		private readonly repository: UserRepository,
		private readonly validator: UserValidator,
	) {}

	async createUser(dto: CreateUserDto) {
		await this.validator.validateEmail(dto.email);

		const formattedBirthDate = await this.validator.validateBirthDate(
			dto.birthDate,
		);

		return this.repository.createUser({
			...dto,
			birthDate: formattedBirthDate,
		});
	}

	async findAll() {
		return this.repository.findAll();
	}
}
