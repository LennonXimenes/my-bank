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

  async execute(body: CreateUserDto): Promise<ResponseUserDto> {
    await this.validator.verifyEmailAlreadyUsed(body.email);

    const code = this.accountService.generateCode();

    const account = await Account.create({
      code,
      agency: this.accountService.generateAgency(),
      check_digit: this.accountService.createCheckDigit(code),
      balance: this.accountService.generateInitialBalance(),
      joint_account: this.accountService.isJointAccount(),
    });

    const user = await User.create({
      name: body.name,
      email: body.email,
      password: body.password,
      birth_date: body.birth_date,
      cpf: body.cpf,
      cnpj: body.cnpj,
      type: body.type,
      account,
    });

    return await this.repository.create(user, account);
  }
}
