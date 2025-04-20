import { Controller } from "@nestjs/common";
import { CreateSavingDto } from "./dto/create.dto";
import { SavingService } from "./saving.service";

@Controller("saving")
export class SavingController {
	constructor(private readonly service: SavingService) {}

	createSaving(@CurrentUser() dto: CreateSavingDto) {
		return this.service.createSaving(dto);
	}
}
