import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateUserDto } from "./dto/create.dto";
import { UpdateUserDto } from "./dto/update.dto";

@Injectable()
export class UserRepository {
	constructor(private readonly prisma: PrismaService) {}

	async createUser(dto: CreateUserDto) {
		return await this.prisma.user.create({ data: dto });
	}

	async updateUser(id: string, dto: UpdateUserDto) {
		return await this.prisma.user.update({
			where: { id },
			data: dto,
		});
	}

	async deleteUser(id: string) {
		return await this.prisma.user.delete({ where: { id } });
	}

	async findAll() {
		return await this.prisma.user.findMany();
	}

	async findById(id: string) {
		return await this.prisma.user.findUnique({
			where: { id },
		});
	}

	async findByEmail(email: string) {
		return await this.prisma.user.findUnique({
			where: { email },
		});
	}
}
