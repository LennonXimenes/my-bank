import { Injectable } from "@nestjs/common";
import { AccountRepository } from "./account.repository";

@Injectable()
export class AccountValidator {
	constructor(private readonly repository: AccountRepository) {}
}
