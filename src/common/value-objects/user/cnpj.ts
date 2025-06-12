import { BadRequestException } from "@nestjs/common";

export class Cnpj {
  public readonly cnpj: string;

  private constructor(cnpj: string) {
    this.cnpj = cnpj;
  }

  public static create(cnpj: string): Cnpj {
    const cleanedCnpj = cnpj.replace(/\D/g, "");

    this.validateCnpj(cleanedCnpj);

    return new Cnpj(cleanedCnpj);
  }

  private static validateCnpj(cnpj: string): void {
    if (cnpj.length !== 14) {
      throw new BadRequestException("Invalid CNPJ length");
    }

    if (/^(\d)\1+$/.test(cnpj)) {
      throw new BadRequestException("Invalid CNPJ");
    }

    const validateDigit = (cnpj: string, pos: number): number => {
      let sum = 0;
      let posIndex = 0;
      const weights = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

      for (let i = pos; i >= 1; i--) {
        sum += parseInt(cnpj.charAt(posIndex)) * weights[i];
        posIndex++;
      }
      const result = sum % 11;
      return result < 2 ? 0 : 11 - result;
    };

    const digitOne = validateDigit(cnpj, 12);
    if (digitOne !== parseInt(cnpj.charAt(12))) {
      throw new BadRequestException("Invalid CNPJ");
    }

    const digitTwo = validateDigit(cnpj, 13);
    if (digitTwo !== parseInt(cnpj.charAt(13))) {
      throw new BadRequestException("Invalid CNPJ");
    }
  }
}
