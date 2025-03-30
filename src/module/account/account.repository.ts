import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateAccountDto } from "./dto/create.dto";
import { iAccount } from "./account.entity";
import { UpdateAccountDto } from "./dto/update.dto";

@Injectable()
export class AccountRepository {
	constructor(private readonly prisma: PrismaService) {}
}
