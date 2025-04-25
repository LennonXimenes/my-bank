import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { iSaving } from "./saving.entity";
import { CreateSavingRepositoryPayload } from "./type/saving.type";

@Injectable()
export class SavingRepository {
	constructor(private readonly prisma: PrismaService) {}

	async create(data: CreateSavingRepositoryPayload): Promise<iSaving> {
		const { account_id, ...rest } = data;
		return await this.prisma.saving.create({
			data: {
				...rest,
				Account: {
					connect: {
						id: account_id,
					},
				},
			},
		});
	}

	async findAccount(accountId: string): Promise<iSaving> {
		return await this.prisma.saving.findUnique({
			where: {
				account_id: accountId,
			},
		});
	}
}
