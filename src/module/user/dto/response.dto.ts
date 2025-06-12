export class ResponseUserDto {
  id: string;
  name: string;
  email: string;
  birth_date: Date;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  Account?: {
    code: string;
    agency: string;
    check_digit: string;
    balance: string;
    joint_account: boolean;
  };
}
