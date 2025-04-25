import { Module } from "@nestjs/common";
import { PrismaModule } from "../../prisma/prisma.module";
import { SettingModule } from "../setting/setting.module";
import { UserModule } from "../user/user.module";
import { SavingController } from "./saving.controller";
import { SavingRepository } from "./saving.repository";
import { SavingService } from "./saving.service";
import { SavingValidator } from "./saving.validator";

@Module({
	imports: [PrismaModule, SettingModule, UserModule],
	controllers: [SavingController],
	providers: [SavingService, SavingRepository, SavingValidator],
	exports: [SavingRepository, SavingService],
})
export class SavingModule {}
