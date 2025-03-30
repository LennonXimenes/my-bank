import { Module } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { PrismaModule } from "../prisma/prisma.module";
import { AccountController } from "./account.controller";
import { AccountRepository } from "./account.repository";
import { AccountValidator } from "./account.validator";
import { AccountService } from "./account.service";

@Module({
	imports: [PrismaModule],
	controllers: [AccountController],
	providers: [AccountService, AccountRepository, AccountValidator],
	exports: [],
})
export class AccountModule {}
