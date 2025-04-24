import { Controller, Post } from "@nestjs/common";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import { iUser } from "../user/user.entity";
import { SavingService } from "./saving.service";

@Controller("saving")
export class SavingController {
	constructor(private readonly service: SavingService) {}

	@Post("create")
	createSaving(@CurrentUser() user: iUser) {
		return this.service.createSaving(user);
	}
}
