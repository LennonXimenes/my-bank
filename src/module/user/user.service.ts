import { Injectable } from "@nestjs/common";
import Decimal from "decimal.js";
import { sanitize } from "src/common/helpers/sanitize";
import { AccountEntity } from "../account/account.entity";
import { AccountRepository } from "../account/account.repository";
import { AccountService } from "../account/account.service";
import { CreateUserDto } from "./dto/create.dto";
import { UpdateUserDto } from "./dto/update.dto";
import { UserEntity } from "./user.entity";
import { UserRepository } from "./user.repository";
import { UserValidator } from "./user.validator";

@Injectable()
export class UserService {
	constructor(
		private readonly repository: UserRepository,
		private readonly validator: UserValidator,
		private readonly accountService: AccountService,
		private readonly accountRepository: AccountRepository,
	) {}

	async createUser(dto: CreateUserDto) {
		await this.validator.validateEmail(dto.email);

		const formattedBirthDate = await this.validator.validateBirthDate(
			dto.birth_date,
		);

		const User = new UserEntity(dto);

		await this.repository.createUser({
			...User,
			birth_date: formattedBirthDate,
		});

		const nextCode = await this.accountRepository.getNextCode();
		const paddedCode = String(nextCode).padStart(8, "0");

		const Account = new AccountEntity({
			id: User.id,
			agency: "0001",
			code: paddedCode,
			user_id: User.id,
			joint_account: false,
		});

		Account.check_digit =
			await this.accountService.createCheckDigit(paddedCode);

		await this.accountRepository.createAccount({
			...Account,
			balance: new Decimal(0),
		});

		return sanitize(User);
	}

	async updateUser(id: string, dto: UpdateUserDto) {
		await this.validator.verifyExists(id);

		await this.validator.validateEmail(dto.email, id);

		const formattedBirthDate = await this.validator.validateBirthDate(
			dto.birth_date,
		);

		const updatedUser = await this.repository.updateUser(id, {
			...dto,
			birth_date: formattedBirthDate,
		});

		return sanitize(updatedUser);
	}

	async deleteUser(id: string) {
		await this.validator.verifyExists(id);

		return await this.repository.deleteUser(id);
	}

	async findAll() {
		const users = await this.repository.findAll();

		return sanitize(users);
	}
}
