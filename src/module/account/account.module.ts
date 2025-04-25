import { Module } from "@nestjs/common";
import { PrismaModule } from "../../prisma/prisma.module";
import { AccountController } from "./account.controller";
import { AccountRepository } from "./account.repository";
import { AccountService } from "./account.service";
import { AccountValidator } from "./account.validator";

@Module({
	imports: [PrismaModule],
	controllers: [AccountController],
	providers: [AccountService, AccountRepository, AccountValidator],
	exports: [AccountRepository, AccountService],
})
export class AccountModule {}
