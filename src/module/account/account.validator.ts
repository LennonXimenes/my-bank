import { Injectable, NotFoundException } from "@nestjs/common";
import { AccountRepository } from "./account.repository";

@Injectable()
export class AccountValidator {
	constructor(private readonly repository: AccountRepository) {}

	async verifyExists(id: string) {
		const founId = await this.repository.findById(id);

		if (!founId) {
			throw new NotFoundException("id not found");
		}

		return founId;
	}
}
