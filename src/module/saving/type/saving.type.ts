import { SavingStatus } from "@prisma/client";
import Decimal from "decimal.js";

export type CreateSavingRepositoryPayload = {
	account_id: string;
	status: SavingStatus;
	balance: Decimal;
	interest_rate: Decimal;
};
