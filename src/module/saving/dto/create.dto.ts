import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateSavingDto {
	@IsNotEmpty()
	@IsUUID()
	account_id: string;
}
