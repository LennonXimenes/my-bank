import { Module } from "@nestjs/common";
import { SettingService } from "./setting.service";

@Module({
	imports: [],
	controllers: [],
	providers: [SettingService],
	exports: [SettingService],
})
export class SettingModule {}
