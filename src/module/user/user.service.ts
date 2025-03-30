import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create.dto";
import { UpdateUserDto } from "./dto/update.dto";
import { UserRepository } from "./user.repository";
import { UserValidator } from "./user.validator";

@Injectable()
export class UserService {
	constructor(
		private readonly repository: UserRepository,
		private readonly validator: UserValidator,
	) {}

	async createUser(dto: CreateUserDto) {
		await this.validator.validateEmail(dto.email);

		const formattedBirthDate = await this.validator.validateBirthDate(
			dto.birth_date,
		);

		return this.repository.createUser({
			...dto,
			birth_date: formattedBirthDate,
		});
	}

	async updateUser(id: string, dto: UpdateUserDto) {
		await this.validator.verifyExists(id);

		await this.validator.validateEmail(dto.email, id);

		const formattedBirthDate = await this.validator.validateBirthDate(
			dto.birth_date,
		);

		return this.repository.updateUser(id, {
			...dto,
			birth_date: formattedBirthDate,
		});
	}

	async deleteUser(id: string) {
		await this.validator.verifyExists(id);

		return this.repository.deleteUser(id);
	}

	async findAll() {
		return this.repository.findAll();
	}
}
