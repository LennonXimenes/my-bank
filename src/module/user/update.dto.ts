import {
	IsString,
	IsEmail,
	IsOptional,
	IsDate,
	IsNotEmpty,
	IsUUID,
} from "class-validator";

export class CreateUserDto {
	@IsNotEmpty()
	@IsUUID()
	id: string;

	@IsOptional()
	@IsDate()
	name?: string;

	@IsOptional()
	@IsDate()
	email?: string;

	@IsOptional()
	@IsDate()
	password?: string;

	@IsOptional()
	@IsDate()
	birthDate?: Date;
}
