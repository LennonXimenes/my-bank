import { IsNotEmpty, IsString, IsDecimal, IsBoolean } from "class-validator";

export class UpdateAccountDto {
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
