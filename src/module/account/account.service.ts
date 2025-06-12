import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class AccountService {
  generateCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  generateAgency(): string {
    return "0001";
  }

  createCheckDigit(code: string): string {
    const weights = [2, 3, 4, 5, 6, 7, 8, 9];
    let sum = 0;
    let weightIndex = 0;

    for (let i = code.length - 1; i >= 0; i--) {
      sum += parseInt(code[i]) * weights[weightIndex];
      weightIndex = (weightIndex + 1) % weights.length;
    }

    const remainder = sum % 11;
    return remainder < 2 ? "0" : (11 - remainder).toString();
  }

  generateInitialBalance(): Prisma.Decimal {
    return new Prisma.Decimal(0);
  }

  isJointAccount(): boolean {
    return false;
  }
}
