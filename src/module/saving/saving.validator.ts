import { Injectable, NotFoundException } from "@nestjs/common";
import { SavingRepository } from "./saving.repository";

@Injectable()
export class SavingValidator {
	constructor(private readonly repository: SavingRepository) {}

	async accountExists(id: string) {
		const accountFound = await this.repository.findAccount(id);

		if (!accountFound) {
			throw new NotFoundException("account not found");
		}

		return accountFound;
	}
}
