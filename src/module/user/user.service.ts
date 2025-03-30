import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create.dto";
import { UpdateUserDto } from "./dto/update.dto";
import { UserRepository } from "./user.repository";
import { UserValidator } from "./user.validator";
import { AccountRepository } from "../account/account.repository";
import { AccountService } from "../account/account.service";
import { AccountEntity } from "../account/account.entity";

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

		await this.repository.createUser({
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

		return await this.repository.deleteUser(id);
	}

	async findAll() {
		return await this.repository.findAll();
	}
}
