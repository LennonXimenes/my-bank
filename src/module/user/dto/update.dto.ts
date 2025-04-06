import {
	IsDate,
	IsEmail,
	IsNotEmpty,
	IsOptional,
	IsString,
	IsUUID,
} from "class-validator";

export class UpdateUserDto {
	@IsNotEmpty()
	@IsUUID()
	id: string;

	@IsOptional()
	@IsString()
	name?: string;

	@IsOptional()
	@IsEmail()
	email?: string;

	@IsOptional()
	@IsString()
	password?: string;

	@IsOptional()
	@IsDate()
	birth_date?: Date;
}
