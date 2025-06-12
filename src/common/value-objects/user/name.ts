import { BadRequestException } from "@nestjs/common";

export class Name {
  public readonly name: string;

  private constructor(name: string) {
    this.name = name;
  }

  public static create(name: string): Name {
    this.validateName(name);

    return new Name(name);
  }

  private static validateName(name: string): void {
    if (!name || name.trim().length < 3) {
      throw new BadRequestException("Name must be at least 3 characters long");
    }
  }
}
