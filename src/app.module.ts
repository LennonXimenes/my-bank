import { Module } from "@nestjs/common";
import { PrismaService } from "./module/prisma/prisma.service";
import { PrismaModule } from "./module/prisma/prisma.module";
import { UserModule } from "./module/user/user.module";

@Module({
	imports: [PrismaModule, UserModule],
	controllers: [],
	providers: [PrismaService],
})
export class AppModule {}
