import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateUserDto } from "./dto/create.dto";
import { UpdateUserDto } from "./dto/update.dto";
import { iUser } from "./user.entity";

@Injectable()
export class UserRepository {
	constructor(private readonly prisma: PrismaService) {}

	async createUser(dto: CreateUserDto): Promise<iUser> {
		return await this.prisma.user.create({ data: dto });
	}

	async updateUser(id: string, dto: UpdateUserDto): Promise<iUser> {
		return await this.prisma.user.update({
			where: { id },
			data: dto,
		});
	}

	async deleteUser(id: string): Promise<iUser> {
		return await this.prisma.user.delete({ where: { id } });
	}

	async findAll(): Promise<iUser[]> {
		return await this.prisma.user.findMany({
			where: {},
			include: {
				Account: true,
			},
		});
	}

	async findById(id: string): Promise<iUser> {
		return await this.prisma.user.findUnique({
			where: { id },
		});
	}

	async findByEmail(email: string): Promise<iUser> {
		return await this.prisma.user.findUnique({
			where: { email },
		});
	}
}
