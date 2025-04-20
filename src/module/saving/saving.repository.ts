import { Injectable } from "@nestjs/common";
import { PrismaService } from "../_prisma/prisma.service";
import { CreateSavingDto } from "./dto/create.dto";
import { iSaving } from "./saving.entity";

@Injectable()
export class SavingRepository {
	constructor(private readonly prisma: PrismaService) {}

	async create(dto: CreateSavingDto): Promise<iSaving> {
		return await this.prisma.saving.create({ data: dto });
	}
}
