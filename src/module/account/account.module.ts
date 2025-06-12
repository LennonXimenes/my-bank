import { Module } from "@nestjs/common";
import { PrismaModule } from "../../prisma/prisma.module";
import { AccountRepository } from "./account.repository";
import { AccountService } from "./account.service";

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [AccountService, AccountRepository],
  exports: [AccountRepository, AccountService],
})
export class AccountModule {}
