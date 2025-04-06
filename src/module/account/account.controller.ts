import { Controller, Param, ParseUUIDPipe, Post } from "@nestjs/common";
import { AccountService } from "./account.service";

@Controller("account")
export class AccountController {
	constructor(private readonly service: AccountService) {}
}
