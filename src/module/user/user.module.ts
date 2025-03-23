import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserRepository } from "./user.repository";
import { UserValidator } from "./user.validator";

@Module({
	imports: [PrismaModule],
	controllers: [UserController],
	providers: [UserService, UserRepository, UserValidator],
	exports: [],
})
export class UserModule {}
