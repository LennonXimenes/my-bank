import { Injectable } from "@nestjs/common";
import Decimal from "decimal.js";

@Injectable()
export class SettingService {
	constructor() {}

	getInterestRate(): Decimal {
		const interestRate = new Decimal(0.5);

		return interestRate;
	}
}
