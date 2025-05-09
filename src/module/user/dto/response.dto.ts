import { Account } from "@prisma/client";

export class ResponseUserDto {
  id: string;
  name: string;
  email: string;
  birth_date: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  Account?: Account;
}
