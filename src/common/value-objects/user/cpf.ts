import { BadRequestException } from "@nestjs/common";

export class Cpf {
  public readonly cpf: string;

  private constructor(cpf: string) {
    this.cpf = cpf;
  }

  public static create(cpf: string): Cpf {
    const cleanedCpf = cpf.replace(/\D/g, "");

    this.validateCpf(cleanedCpf);

    return new Cpf(cleanedCpf);
  }

  private static validateCpf(cpf: string): void {
    if (cpf.length !== 11) {
      throw new BadRequestException("Invalid CPF length");
    }

    if (/^(\d)\1+$/.test(cpf)) {
      throw new BadRequestException("Invalid CPF");
    }

    let sum = 0;
    let rest;

    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    rest = (sum * 10) % 11;
    if (rest === 10 || rest === 11) rest = 0;
    if (rest !== parseInt(cpf.substring(9, 10))) {
      throw new BadRequestException("Invalid CPF");
    }

    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    rest = (sum * 10) % 11;
    if (rest === 10 || rest === 11) rest = 0;
    if (rest !== parseInt(cpf.substring(10, 11))) {
      throw new BadRequestException("Invalid CPF");
    }
  }
}
