import { UserType } from "@prisma/client";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  cpf?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  cnpj?: string;

  @IsNotEmpty()
  @IsString()
  type: UserType;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  birth_date?: string;
}
