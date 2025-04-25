import { Injectable } from "@nestjs/common";
import { SavingStatus } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { SettingService } from "../setting/setting.service";
import { UserValidator } from "../user/user.validator";
import { SavingEntity } from "./saving.entity";
import { SavingRepository } from "./saving.repository";
import { SavingValidator } from "./saving.validator";

@Injectable()
export class SavingService {
	constructor(
		private readonly repository: SavingRepository,
		private readonly validator: SavingValidator,
		private readonly userValidator: UserValidator,
		private readonly settingService: SettingService,
	) {}

	async createSaving(user: any) {
		const userFound = await this.userValidator.verifyUserAccount(user.id);

		const accountId = userFound?.Account?.id;

		// await this.validator.accountExists(accountId); // PARA UPDATE

		const Saving = new SavingEntity({
			account_id: accountId,
			status: SavingStatus.ACTIVE,
		});

		const interestRate = this.settingService.getInterestRate();

		return await this.repository.create({
			...Saving,
			balance: new Decimal(0),
			interest_rate: interestRate,
		});
	}
}
