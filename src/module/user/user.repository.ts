import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateUserDto } from "./dto/update.dto";
import { ResponseUserDto } from "./dto/response.dto";
import { Account } from "../account/account.entity";
import { FindWhereDto } from "./dto/find-where.dto";
import { User } from "./user.entity";
import { User as PrismaUser } from "@prisma/client";

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(user: User, account: Account): Promise<ResponseUserDto> {
    return await this.prisma.$transaction(async (tx) => {
      const userDb = await tx.user.create({
        data: {
          name: user.getName(),
          email: user.getEmail(),
          password: user.getPassword(),
          birth_date: user.getBirthDate(),
          cpf: user.getCpf(),
          cnpj: user.getCnpj(),
          type: user.getType(),
        },
      });

      const accountDb = await tx.account.create({
        data: {
          code: account.getCode(),
          agency: account.getAgency(),
          check_digit: account.getCheckDigit(),
          balance: account.getBalance(),
          joint_account: account.getJointAccount(),
          user_id: userDb.id,
        },
      });

      return {
        id: userDb.id,
        name: userDb.name,
        email: userDb.email,
        birth_date: userDb.birth_date,
        created_at: userDb.created_at,
        updated_at: userDb.updated_at,
        deleted_at: userDb.deleted_at,
        Account: {
          code: accountDb.code,
          agency: accountDb.agency,
          check_digit: accountDb.check_digit,
          balance: accountDb.balance.toString(),
          joint_account: accountDb.joint_account,
        },
      };
    });
  }

  async updateUser(id: string, dto: UpdateUserDto): Promise<ResponseUserDto> {
    // const user = await this.prisma.user.update({
    //   where: { id },
    //   data: dto,
    // });

    // return new ResponseUserDto(user);
    return;
  }

  async deleteUser(id: string): Promise<ResponseUserDto> {
    // const user = await this.prisma.user.delete({ where: { id } });
    // return new ResponseUserDto(user);
    return;
  }

  async findAll(): Promise<ResponseUserDto[]> {
    // const users = await this.prisma.user.findMany({
    //   where: {},
    //   include: {
    //     Account: true,
    //   },
    // });

    // return users.map((user) => new ResponseUserDto(user));
    return;
  }

  async findById(id: string): Promise<ResponseUserDto> {
    // const user = await this.prisma.user.findUnique({
    //   where: { id },
    // });

    // return user ? new ResponseUserDto(user) : null;
    return;
  }

  async findWhere(where: FindWhereDto): Promise<PrismaUser | null> {
    return await this.prisma.user.findFirst({
      where,
    });
  }

  async userAccount(id: string): Promise<ResponseUserDto> {
    // const user = await this.prisma.user.findUnique({
    //   where: { id },
    //   include: {
    //     Account: true,
    //   },
    // });

    // return user ? new ResponseUserDto(user) : null;
    return;
  }
}
