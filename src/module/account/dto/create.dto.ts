import {
	IsNotEmpty,
	IsString,
	IsDecimal,
	IsBoolean,
	IsNumber,
} from "class-validator";

export class CreateAccountDto {
	@IsNotEmpty()
	@IsNumber()
	code: number;

	@IsNotEmpty()
	@IsString()
	agency: string;

	@IsNotEmpty()
	@IsString()
	check_digit: string;

	@IsNotEmpty()
	@IsDecimal()
	balance: number;

	@IsNotEmpty()
	@IsBoolean()
	joint_account: boolean;

	@IsNotEmpty()
	@IsString()
	user_id: string;
}
