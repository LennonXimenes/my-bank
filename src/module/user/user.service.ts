import { Injectable } from "@nestjs/common";
import { AccountRepository } from "../account/account.repository";
import { AccountService } from "../account/account.service";
import { UpdateUserDto } from "./dto/update.dto";
import { UserRepository } from "./user.repository";
import { UserValidator } from "./user.validator";
@Injectable()
export class UserService {
  constructor(
    private readonly repository: UserRepository,
    private readonly validator: UserValidator,
    private readonly accountService: AccountService,
    private readonly accountRepository: AccountRepository,
  ) {}

  // TODO REFAZER TODO O RESTO!
  async updateUser(id: string, dto: UpdateUserDto): Promise<any> {
    return;
  }

  async deleteUser(id: string): Promise<any> {
    await this.validator.verifyExists(id);

    return await this.repository.deleteUser(id);
  }

  async findAll(): Promise<any> {
    // const users = await this.repository.findAll();

    // return sanitize(users);
    return;
  }
}
