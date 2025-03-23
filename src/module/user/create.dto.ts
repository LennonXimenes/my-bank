import {
	IsString,
	IsEmail,
	IsOptional,
	IsDate,
	IsNotEmpty,
} from "class-validator";

export class CreateUserDto {
	@IsNotEmpty()
	@IsString()
	name: string;

	@IsNotEmpty()
	@IsEmail()
	email: string;

	@IsNotEmpty()
	@IsString()
	password: string;

	@IsNotEmpty()
	@IsString()
	birthDate: Date;
}
