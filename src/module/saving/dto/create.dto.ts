import { Decimal } from "@prisma/client/runtime/library";
import { IsDecimal, IsEnum, IsNotEmpty, IsUUID } from "class-validator";
import { SavingStatus } from "src/common/enums/saving-status.enum";

export class CreateSavingDto {
	@IsNotEmpty()
	@IsDecimal()
	balance: Decimal;

	@IsNotEmpty()
	@IsDecimal()
	interest_rate: Decimal;

	@IsNotEmpty()
	@IsEnum(SavingStatus)
	status: SavingStatus;

	@IsNotEmpty()
	@IsUUID()
	account_id: string;
}
