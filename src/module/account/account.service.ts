import { Injectable } from "@nestjs/common";
import { AccountRepository } from "./account.repository";
import { AccountValidator } from "./account.validator";

@Injectable()
export class AccountService {
	constructor(
		private readonly repository: AccountRepository,
		private readonly validator: AccountValidator,
	) {}

	async createCheckDigit(code: string) {
		const codeStr = code;
		const weights = [2, 3, 4, 5, 6, 7, 8, 9];
		let sum = 0;
		let weightIndex = 0;

		for (let i = codeStr?.length - 1; i >= 0; i--) {
			sum += parseInt(codeStr[i]) * weights[weightIndex];
			weightIndex = (weightIndex + 1) % weights?.length;
		}

		const remainder = sum % 11;
		return remainder < 2 ? "0" : (11 - remainder).toString();
	}
}
