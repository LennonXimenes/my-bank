import { BaseEntity } from "src/common/abstracts/base-entity.abstract";
import { Name } from "src/common/value-objects/user/name";
import { Email } from "src/common/value-objects/user/email";
import { Cpf } from "src/common/value-objects/user/cpf";
import { Cnpj } from "src/common/value-objects/user/cnpj";
import { Password } from "src/common/value-objects/user/password";
import { BirthDate } from "src/common/value-objects/user/birth-date";
import { Account } from "../account/account.entity";
import { BadRequestException } from "@nestjs/common";
import { UserType } from "@prisma/client";

export class User extends BaseEntity {
  private constructor(
    private readonly name: Name,
    private readonly email: Email,
    private readonly cpf: Cpf | null,
    private readonly cnpj: Cnpj | null,
    private readonly password: Password,
    private readonly birth_date: BirthDate | null,
    private readonly type: UserType,
    private account?: Account,
  ) {
    super();
  }

  public static async create(props: {
    name: string;
    email: string;
    cpf?: string;
    cnpj?: string;
    password: string;
    birth_date?: string;
    type: UserType;
    account?: Account;
  }): Promise<User> {
    const name = Name.create(props.name);
    const email = Email.create(props.email);
    const cpf = props.cpf ? Cpf.create(props.cpf) : null;
    const cnpj = props.cnpj ? Cnpj.create(props.cnpj) : null;
    const password = await Password.create(props.password);
    const birthDate = props.birth_date
      ? BirthDate.create(props.birth_date)
      : null;

    if (props.type === UserType.PF && !cpf) {
      throw new BadRequestException("Type is CPF but no CPF provided");
    }
    if (props.type === UserType.PJ && !cnpj) {
      throw new BadRequestException("Type is CNPJ but no CNPJ provided");
    }

    return new User(
      name,
      email,
      cpf,
      cnpj,
      password,
      birthDate,
      props.type,
      props.account,
    );
  }

  public assignAccount(account: Account): void {
    this.account = account;
  }

  public getName(): string {
    return this.name.name;
  }

  public getEmail(): string {
    return this.email.email;
  }

  public getCpf(): string | null {
    return this.cpf?.cpf ?? null;
  }

  public getCnpj(): string | null {
    return this.cnpj?.cnpj ?? null;
  }

  public getType(): UserType {
    return this.type;
  }

  public getPassword(): string {
    return this.password.value;
  }

  public getBirthDate(): string | null {
    return this.birth_date?.birth_date ?? null;
  }
}
