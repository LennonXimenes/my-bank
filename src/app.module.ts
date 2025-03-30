import { Module } from "@nestjs/common";
import { PrismaService } from "./module/prisma/prisma.service";
import { PrismaModule } from "./module/prisma/prisma.module";
import { UserModule } from "./module/user/user.module";
import { AccountModule } from "./module/account/account.module";

@Module({
	imports: [PrismaModule, UserModule, AccountModule],
	controllers: [],
	providers: [PrismaService],
})
export class AppModule {}
