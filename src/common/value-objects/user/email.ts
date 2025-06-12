import { BadRequestException } from "@nestjs/common";

export class Email {
  public readonly email: string;

  private constructor(email: string) {
    this.email = email;
  }

  public static create(email: string): Email {
    this.validateEmail(email);

    return new Email(email);
  }

  private static validateEmail(email: string): void {
    const validateEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!validateEmail.test(email)) {
      throw new BadRequestException("Invalid email format");
    }
  }
}
