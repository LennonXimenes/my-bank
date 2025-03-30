import { Body, Controller, Param, ParseUUIDPipe, Post } from "@nestjs/common";
import { AccountService } from "./account.service";
import { CreateAccountDto } from "./dto/create.dto";

@Controller("account")
export class AccountController {
	constructor(private readonly service: AccountService) {}
}
