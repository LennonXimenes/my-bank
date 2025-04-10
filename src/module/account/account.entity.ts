import { Decimal } from "@prisma/client/runtime/library";
import { randomUUID } from "crypto";

export interface iAccount {
	id?: string;
	code?: string;
	agency?: string;
	check_digit?: string;
	balance?: Decimal;
	joint_account?: boolean;
	created_at?: Date;
	updated_at?: Date;
	deleted_at?: Date | null;
	user_id?: string;
}

interface iAccountCreate {
	agency: string;
	check_digit: string;
	balance?: number;
	joint_account: boolean;
	user_id: string;
}

interface iAccountUpdate {
	agency?: string;
	check_digit?: string;
	balance?: number;
	joint_account?: boolean;
}

export class AccountEntity {
	id: string;
	code: string;
	agency: string;
	check_digit: string;
	balance: number;
	joint_account: boolean;
	created_at: Date;
	updated_at: Date;
	deleted_at: Date | null;
	user_id: string;

	constructor(account: iAccount) {
		if (account.id) this.id = account.id;
		if (account.code) this.code = account.code;
		if (account.agency) this.setAgency(account.agency);
		if (account.check_digit) this.setCheckDigit(account.check_digit);
		this.balance = account.balance?.toNumber() ?? 0;
		this.joint_account = account.joint_account ?? false;
		this.created_at = account.created_at ?? new Date();
		this.updated_at = account.updated_at ?? new Date();
		this.deleted_at = account.deleted_at ?? null;
		if (account.user_id) this.user_id = account.user_id;
	}

	get() {
		return {
			id: this.id,
			code: this.code,
			agency: this.agency,
			check_digit: this.check_digit,
			balance: this.balance,
			joint_account: this.joint_account,
			created_at: this.created_at,
			updated_at: this.updated_at,
			deleted_at: this.deleted_at,
			user_id: this.user_id,
		};
	}

	getId(): string {
		return this.id;
	}
	getCode(): string {
		return this.code;
	}
	getAgency(): string {
		return this.agency;
	}
	getCheckDigit(): string {
		return this.check_digit;
	}
	getBalance(): number {
		return this.balance;
	}
	isJointAccount(): boolean {
		return this.joint_account;
	}
	getCreatedAt(): Date {
		return this.created_at;
	}
	getUpdatedAt(): Date {
		return this.updated_at;
	}
	getDeletedAt(): Date | null {
		return this.deleted_at;
	}
	getUserId(): string {
		return this.user_id;
	}

	setId(): void {
		this.id = randomUUID();
	}
	setCode(code: string): void {
		this.code = code;
	}
	setAgency(agency: string): void {
		this.agency = agency;
	}
	setCheckDigit(check_digit: string): void {
		this.check_digit = check_digit;
	}
	setBalance(balance: number): void {
		this.balance = balance;
	}
	setJointAccount(joint_account: boolean): void {
		this.joint_account = joint_account;
	}
	setCreatedAt(): void {
		this.created_at = new Date();
	}
	setUpdatedAt(): void {
		this.updated_at = new Date();
	}
	setDeletedAt(deleted: boolean): void {
		if (deleted) {
			this.deleted_at = new Date();
		} else {
			this.deleted_at = null;
		}
	}
	setUserId(user_id: string): void {
		this.user_id = user_id;
	}

	create(account: iAccountCreate): void {
		this.setId();
		this.setAgency(account.agency);
		this.setCheckDigit(account.check_digit);
		this.setBalance(account.balance ?? 0);
		this.setJointAccount(account.joint_account);
		this.setCreatedAt();
		this.setUpdatedAt();
		this.setDeletedAt(false);
		this.setUserId(account.user_id);
	}

	update(account: iAccountUpdate): void {
		this.setUpdatedAt();
		if (account.agency) this.setAgency(account.agency);
		if (account.check_digit) this.setCheckDigit(account.check_digit);
		if (account.balance !== undefined) this.setBalance(account.balance);
		if (account.joint_account !== undefined)
			this.setJointAccount(account.joint_account);
	}
}
