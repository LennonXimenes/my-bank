import { Injectable } from "@nestjs/common";
import Decimal from "decimal.js";
import { SettingService } from "../setting/setting.service";
import { CreateSavingDto } from "./dto/create.dto";
import { SavingEntity } from "./saving.entity";
import { SavingRepository } from "./saving.repository";
import { SavingValidator } from "./saving.validator";

@Injectable()
export class SavingService {
	constructor(
		private readonly repository: SavingRepository,
		private readonly validator: SavingValidator,
		private readonly settingService: SettingService,
	) {}

	async createSaving(dto: CreateSavingDto) {
		const accountId = this.validator.accountExists(dto.account_id);

		const Saving = new SavingEntity({
			account_id: accountId,
			balance: new Decimal(0),
			interest_rate: this.settingService.getInterestRate(),
		});

		return await this.repository.create(Saving);
	}
}
