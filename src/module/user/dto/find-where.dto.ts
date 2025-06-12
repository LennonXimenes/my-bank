import { UserType } from "@prisma/client";
import { IsEmail, IsEnum, IsOptional, IsString } from "class-validator";

export class FindWhereDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  cpf?: string;

  @IsOptional()
  @IsString()
  cnpj?: string;

  @IsOptional()
  @IsEnum(UserType)
  type?: UserType;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  birth_date?: string;
}
