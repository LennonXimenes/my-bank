import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateUserDto } from "./create.dto";

@Injectable()
export class UserRepository {
	constructor(private readonly prisma: PrismaService) {}

	async createUser(dto: CreateUserDto) {
		return await this.prisma.user.create({ data: dto });
	}

	async findAll() {
		return await this.prisma.user.findMany();
	}

	async findByEmail(email: string) {
		return await this.prisma.user.findUnique({
			where: { email },
		});
	}
}
