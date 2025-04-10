import { Module } from "@nestjs/common";
import { PrismaModule } from "./module/_prisma/prisma.module";
import { PrismaService } from "./module/_prisma/prisma.service";
import { AccountModule } from "./module/account/account.module";
import { UserModule } from "./module/user/user.module";

@Module({
	imports: [PrismaModule, UserModule, AccountModule],
	controllers: [],
	providers: [PrismaService],
})
export class AppModule {}
