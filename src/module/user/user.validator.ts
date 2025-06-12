import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserValidator {
  constructor(
    private readonly prisma: PrismaService,
    private readonly repository: UserRepository,
  ) {}

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

  async verifyEmailExists(email: string, id?: string): Promise<any> {
    // const foundEmail = await this.repository.findByEmail(email);
    // if (!foundEmail && id) {
    //   console.log(foundEmail);
    //   throw new NotFoundException("invalid credentials");
    // }
    // if (foundEmail?.id != id) {
    //   console.log(foundEmail);
    //   throw new ConflictException("email already exists");
    // }
    // return foundEmail;
    return;
  }

  async verifyUserAccount(id: string): Promise<any> {
    const userAccount = await this.repository.userAccount(id);

    if (!userAccount) {
      throw new NotFoundException("user account not found");
    }

    return userAccount;
  }
}
