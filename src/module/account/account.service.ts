import { Injectable } from "@nestjs/common";
import { AccountRepository } from "./account.repository";
import { AccountValidator } from "./account.validator";

@Injectable()
export class AccountService {
	constructor(
		private readonly repository: AccountRepository,
		private readonly validator: AccountValidator,
	) {}
}
