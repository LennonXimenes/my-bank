import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserValidator {
  constructor(private readonly repository: UserRepository) {}

  async verifyExists(id: string): Promise<any> {
    const foundId = await this.repository.findById(id);

    if (!foundId) {
      throw new NotFoundException("id not found");
    }

    return foundId;
  }

  async verifyEmailAlreadyUsed(email: string): Promise<void> {
    const foundEmail = await this.repository.findWhere({ email });
    if (foundEmail) {
      throw new ConflictException("Email already in use");
    }
  }

  async verifyUserAccount(id: string): Promise<any> {
    const userAccount = await this.repository.userAccount(id);

    if (!userAccount) {
      throw new NotFoundException("user account not found");
    }

    return userAccount;
  }
}
