import { Injectable } from "@nestjs/common";
import { PrismaService } from "../_prisma/prisma.service";
import { CreateSavingDto } from "./dto/create.dto";

@Injectable()
export class SavingRepository {
	constructor(private readonly prisma: PrismaService) {}

	async create(dto: CreateSavingDto) {
		// return await this.prisma.saving.create({ data: dto });
		return;
	}

	async findAccount(accountId: string) {
		return await this.prisma.saving.findUnique({
			where: {
				account_id: accountId,
			},
		});
	}
}
