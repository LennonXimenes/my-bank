import { Module } from "@nestjs/common";
import { PrismaModule } from "./module/_prisma/prisma.module";
import { PrismaService } from "./module/_prisma/prisma.service";
import { AccountModule } from "./module/account/account.module";
import { AuthModule } from "./module/auth/auth.module";
import { SavingModule } from "./module/saving/saving.module";
import { SettingModule } from "./module/setting/setting.module";
import { UserModule } from "./module/user/user.module";

@Module({
	imports: [
		PrismaModule,
		SettingModule,
		AuthModule,
		UserModule,
		AccountModule,
		SavingModule,
	],
	controllers: [],
	providers: [PrismaService],
})
export class AppModule {}
