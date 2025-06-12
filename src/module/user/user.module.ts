import { Module } from "@nestjs/common";
import { PrismaModule } from "../../prisma/prisma.module";
import { AccountModule } from "../account/account.module";
import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";
import { UserValidator } from "./user.validator";
import { CreateUserWithAccountService } from "./application/create-user-with-account.service";

@Module({
  imports: [PrismaModule, AccountModule],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    UserValidator,
    CreateUserWithAccountService,
  ],
  exports: [UserRepository, UserValidator],
})
export class UserModule {}
