import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserRepository } from "./user.repository";
import { UserValidator } from "./user.validator";
import { AccountService } from "../account/account.service";
import { AccountModule } from "../account/account.module";

@Module({
	imports: [PrismaModule, AccountModule],
	controllers: [UserController],
	providers: [UserService, UserRepository, UserValidator],
	exports: [],
})
export class UserModule {}
