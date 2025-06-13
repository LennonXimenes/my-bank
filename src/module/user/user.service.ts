import { Injectable } from "@nestjs/common";
import { AccountRepository } from "../account/account.repository";
import { AccountService } from "../account/account.service";
import { UpdateUserDto } from "./dto/update.dto";
import { UserRepository } from "./user.repository";
import { UserValidator } from "./user.validator";
import { ResponseUserDto } from "./dto/response.dto";
import { User } from "./user.entity";
@Injectable()
export class UserService {
  constructor(
    private readonly repository: UserRepository,
    private readonly validator: UserValidator,
    private readonly accountService: AccountService,
    private readonly accountRepository: AccountRepository,
  ) {}

  async update(id: string, body: UpdateUserDto): Promise<ResponseUserDto> {
    const foundUser = this.validator.verifyExists(id);

    return;
  }

  // TODO REFAZER TODO O RESTO!
  async delete(id: string): Promise<any> {
    await this.validator.verifyExists(id);

    return await this.repository.delete(id);
  }

  async findAll(): Promise<any> {
    // const users = await this.repository.findAll();

    // return sanitize(users);
    return;
  }
}
