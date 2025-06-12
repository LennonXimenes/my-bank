// src/module/user/services/create-user-with-account.service.ts

import { Injectable } from "@nestjs/common";
import { UserValidator } from "../user.validator";
import { AccountService } from "../../account/account.service";
import { User } from "../user.entity";
import { Account } from "../../account/account.entity";
import { UserRepository } from "../user.repository";
import { CreateUserDto } from "../dto/create.dto";
import { ResponseUserDto } from "../dto/response.dto";

@Injectable()
export class CreateUserWithAccountService {
  constructor(
    private readonly repository: UserRepository,
    private readonly validator: UserValidator,
    private readonly accountService: AccountService,
  ) {}

  async execute(data: CreateUserDto): Promise<ResponseUserDto> {
    await this.validator.verifyEmailAlreadyUsed(data.email);

    const code = this.accountService.generateCode();

    const account = await Account.create({
      code,
      agency: this.accountService.generateAgency(),
      check_digit: this.accountService.createCheckDigit(code),
      balance: this.accountService.generateInitialBalance(),
      joint_account: this.accountService.isJointAccount(),
    });

    const user = await User.create({
      name: data.name,
      email: data.email,
      password: data.password,
      birth_date: data.birth_date,
      cpf: data.cpf,
      cnpj: data.cnpj,
      type: data.type,
      account,
    });

    return await this.repository.createUser(user, account);
  }
}
