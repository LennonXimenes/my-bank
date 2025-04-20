import { Injectable } from "@nestjs/common";
import { SavingRepository } from "./saving.repository";

@Injectable()
export class SavingValidator {
	constructor(private readonly repository: SavingRepository) {}

	async createSaving(dto: any) {
		return;
	}
}
