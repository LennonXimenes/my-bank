import bcrypt from "bcrypt";
import { BadRequestException } from "@nestjs/common";

export class Password {
  private constructor(private readonly _password: string) {}

  get value(): string {
    return this._password;
  }

  static async create(rawPassword: string): Promise<Password> {
    Password.validatePassword(rawPassword);
    const hashed = await Password.hashPassword(rawPassword);
    return new Password(hashed);
  }

  static validatePassword(password: string): void {
    const validatePassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!validatePassword.test(password)) {
      throw new BadRequestException(
        "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
      );
    }
  }

  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  public async comparePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this._password);
  }
}
