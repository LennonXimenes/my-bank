import Decimal from "decimal.js";
import { BaseEntity } from "src/common/abstracts/base-entity.abstract";

export class Account extends BaseEntity {
  private constructor(
    private readonly code: string,
    private readonly agency: string,
    private readonly check_digit: string,
    private readonly balance: Decimal,
    private readonly joint_account: boolean,
    private readonly saving?: string, // TODO
  ) {
    super();
  }

  public static async create(props: {
    code: string;
    agency: string;
    check_digit: string;
    balance: Decimal;
    joint_account: boolean;
    saving?: string;
  }): Promise<Account> {
    return new Account(
      props.code,
      props.agency,
      props.check_digit,
      props.balance,
      props.joint_account,
      props.saving,
    );
  }

  public getCode(): string {
    return this.code;
  }

  public getAgency(): string {
    return this.agency;
  }

  public getCheckDigit(): string {
    return this.check_digit;
  }

  public getBalance(): Decimal {
    return this.balance;
  }

  public getJointAccount(): boolean {
    return this.joint_account;
  }
}
