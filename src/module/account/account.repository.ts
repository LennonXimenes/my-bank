import { Injectable } from "@nestjs/common";
import { PrismaService } from "../_prisma/prisma.service";
import { iAccount } from "./account.entity";
import { CreateAccountDto } from "./dto/create.dto";

@Injectable()
export class AccountRepository {
	constructor(private readonly prisma: PrismaService) {}

	async createAccount(dto: CreateAccountDto): Promise<iAccount> {
		const { user_id, ...rest } = dto;
		return await this.prisma.account.create({
			data: {
				...rest,
				User: {
					connect: {
						id: user_id,
					},
				},
			},
		});
	}

	async findById(id: string): Promise<iAccount> {
		return await this.prisma.account.findUnique({
			where: { user_id: id },
		});
	}

	async getNextCode(): Promise<number> {
		const lastAccount = await this.prisma.account.findFirst({
			orderBy: { code: "desc" },
			select: { code: true },
		});

		return lastAccount ? Number(lastAccount.code) + 1 : 1;
	}
}
