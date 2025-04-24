import { Module } from "@nestjs/common";
import { PrismaModule } from "../_prisma/prisma.module";
import { AccountModule } from "../account/account.module";
import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";
import { UserValidator } from "./user.validator";

@Module({
	imports: [PrismaModule, AccountModule],
	controllers: [UserController],
	providers: [UserService, UserRepository, UserValidator],
	exports: [UserRepository, UserValidator],
})
export class UserModule {}
