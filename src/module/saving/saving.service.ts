import { Injectable } from "@nestjs/common";
import { CreateSavingDto } from "./dto/create.dto";
import { SavingRepository } from "./saving.repository";
import { SavingValidator } from "./saving.validator";

@Injectable()
export class SavingService {
	constructor(
		private readonly repository: SavingRepository,
		private readonly validator: SavingValidator,
	) {}

	async createSaving(dto: CreateSavingDto) {
		return await this.repository.create(dto);
	}
}
