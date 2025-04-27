import { Controller, Post, UseGuards } from "@nestjs/common";
import { SavingService } from "./saving.service";

@Controller("saving")
export class SavingController {
	constructor(private readonly service: SavingService) {}

	@UseGuards()
	@Post("create")
	createSaving() {
		return;
	}
}
