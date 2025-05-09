import { Injectable } from "@nestjs/common";
import Decimal from "decimal.js";
import { sanitize } from "src/common/helpers/sanitize";
import { AccountEntity } from "../account/account.entity";
import { AccountRepository } from "../account/account.repository";
import { AccountService } from "../account/account.service";
import { CreateUserDto } from "./dto/create.dto";
import { UpdateUserDto } from "./dto/update.dto";
import { UserRepository } from "./user.repository";
import { UserValidator } from "./user.validator";
import { ResponseUserDto } from "./dto/response.dto";

@Injectable()
export class UserService {
  constructor(
    private readonly repository: UserRepository,
    private readonly validator: UserValidator,
    private readonly accountService: AccountService,
    private readonly accountRepository: AccountRepository,
  ) {}

  async createUser(dto: CreateUserDto): Promise<ResponseUserDto> {
    await this.validator.validateEmail(dto.email);

    return;
  }

  async updateUser(id: string, dto: UpdateUserDto): Promise<any> {
    return;
  }

  async deleteUser(id: string): Promise<any> {
    await this.validator.verifyExists(id);

    return await this.repository.deleteUser(id);
  }

  async findAll(): Promise<any> {
    const users = await this.repository.findAll();

    return sanitize(users);
  }
}
