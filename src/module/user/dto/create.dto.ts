import { UserType } from "@prisma/client";
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

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
  @IsEnum(UserType)
  type: UserType;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  birth_date?: string;
}
