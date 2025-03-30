import { IsDate, IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export class UpdateUserDto {
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
	birth_date?: Date;
}
