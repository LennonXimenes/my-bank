import {
	IsBoolean,
	IsDecimal,
	IsNotEmpty,
	IsString,
	IsUUID,
} from "class-validator";
import Decimal from "decimal.js";

export class CreateAccountDto {
	@IsNotEmpty()
	@IsString()
	code: string;

	@IsNotEmpty()
	@IsString()
	agency: string;

	@IsNotEmpty()
	@IsString()
	check_digit: string;

	@IsNotEmpty()
	@IsDecimal()
	balance: Decimal;

	@IsNotEmpty()
	@IsBoolean()
	joint_account: boolean;

	@IsNotEmpty()
	@IsUUID()
	user_id: string;
}
