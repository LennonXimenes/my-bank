import { Decimal } from "@prisma/client/runtime/library";
import {
	IsNotEmpty,
	IsString,
	IsDecimal,
	IsBoolean,
	IsNumber,
	IsUUID,
} from "class-validator";

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
