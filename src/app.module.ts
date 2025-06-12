import { Module } from "@nestjs/common";
import { AccountModule } from "./module/account/account.module";
import { SavingModule } from "./module/saving/saving.module";
import { SettingModule } from "./module/setting/setting.module";
import { UserModule } from "./module/user/user.module";
import { PrismaModule } from "./prisma/prisma.module";
import { PrismaService } from "./prisma/prisma.service";

@Module({
  imports: [
    PrismaModule,
    SettingModule,
    UserModule,
    AccountModule,
    SavingModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
