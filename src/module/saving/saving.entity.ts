import { SavingStatus } from "@prisma/client";
import { randomUUID } from "crypto";
import Decimal from "decimal.js";

export interface iSaving {
	id?: string;
	balance?: Decimal;
	interest_rate?: Decimal;
	status?: SavingStatus;
	created_at?: Date;
	updated_at?: Date;
	account_id?: string;
}

interface iSavingCreate {
	balance?: number;
	interest_rate?: number;
	status?: SavingStatus;
	account_id?: string;
}

interface iSavingUpdate {
	balance?: number;
	interest_rate?: number;
	status?: SavingStatus;
	account_id?: string;
}

export class SavingEntity {
	private id: string;
	private balance: number;
	private interest_rate: number;
	private status: SavingStatus;
	private created_at: Date;
	private updated_at: Date;
	private account_id: string;

	constructor(saving: iSaving) {
		if (saving.id) this.id = saving.id;
		this.balance = saving.balance?.toNumber() ?? 0;
		this.interest_rate = saving.interest_rate?.toNumber() ?? 0;
		this.status = saving.status ?? SavingStatus.CLOSED;
		this.created_at = saving.created_at ?? new Date();
		this.updated_at = saving.updated_at ?? new Date();
		this.account_id = saving.account_id ?? "";
	}

	get() {
		return {
			id: this.id,
			balance: this.balance,
			interest_rate: this.interest_rate,
			status: this.status,
			created_at: this.created_at,
			updated_at: this.updated_at,
			account_id: this.account_id,
		};
	}

	getId(): string {
		return this.id;
	}
	getBalance(): number {
		return this.balance;
	}
	getInterestRate(): number {
		return this.interest_rate;
	}
	getStatus(): SavingStatus {
		return this.status;
	}
	getCreatedAt(): Date {
		return this.created_at;
	}
	getUpdatedAt(): Date {
		return this.updated_at;
	}
	getAccountId(): string {
		return this.account_id;
	}

	setId(): void {
		this.id = randomUUID();
	}
	setBalance(balance: number): void {
		this.balance = balance;
	}
	setInterestRate(interest_rate: number): void {
		this.interest_rate = interest_rate;
	}
	setStatus(status: SavingStatus): void {
		this.status = status;
	}
	setCreatedAt(): void {
		this.created_at = new Date();
	}
	setUpdatedAt(): void {
		this.updated_at = new Date();
	}
	setAccountId(account_id: string): void {
		this.account_id = account_id;
	}

	create(saving: iSavingCreate): void {
		this.setId();
		this.setBalance(saving.balance ?? 0);
		this.setInterestRate(saving.interest_rate ?? 0);
		this.setStatus(saving.status ?? SavingStatus.CLOSED);
		this.setCreatedAt();
		this.setUpdatedAt();
		this.setAccountId(saving.account_id ?? "");
	}

	update(saving: iSavingUpdate): void {
		this.setUpdatedAt();
		if (saving.balance !== undefined) this.setBalance(saving.balance);
		if (saving.interest_rate !== undefined)
			this.setInterestRate(saving.interest_rate);
		if (saving.status !== undefined) this.setStatus(saving.status);
		if (saving.account_id !== undefined) this.setAccountId(saving.account_id);
	}
}
