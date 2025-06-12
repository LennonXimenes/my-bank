import { IsEmail, IsOptional, IsString } from "class-validator";

export class FindWhereDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  birth_date?: string;
}
