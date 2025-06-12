import { BadRequestException } from "@nestjs/common";

export class BirthDate {
  public readonly birth_date: string;

  private constructor(birth_date: string) {
    this.birth_date = birth_date;
  }

  public static create(birth_date: string): BirthDate {
    const isoString = this.validateBirthDate(birth_date);

    return new BirthDate(isoString);
  }

  private static validateBirthDate(birth_date: string): string {
    const dateString = birth_date.toString();

    const [day, month, year] = dateString.split("/").map(Number);

    if (isNaN(day) || isNaN(month) || isNaN(year)) {
      throw new BadRequestException(
        "Invalid birth date format. The expected format is DD/MM/YYYY",
      );
    }

    if (month < 1 || month > 12) {
      throw new BadRequestException("Invalid month");
    }

    const daysInMonth = this.getDaysInMonth(month, year);
    if (day < 1 || day > daysInMonth) {
      throw new BadRequestException("Invalid day for the given month");
    }

    const isoString = `${year}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day}T00:00:00.000Z`;
    const formattedDate = new Date(isoString);

    if (isNaN(formattedDate.getTime())) {
      throw new BadRequestException("Invalid birth date");
    }

    const today = new Date();
    if (formattedDate > today) {
      throw new BadRequestException("Birth date cannot be in the future");
    }

    const minAgeDate = new Date();
    minAgeDate.setFullYear(today.getFullYear() - 18);
    if (formattedDate > minAgeDate) {
      throw new BadRequestException("User must be at least 18 years old");
    }

    return isoString;
  }

  private static getDaysInMonth(month: number, year: number): number {
    const monthsWith31Days = [1, 3, 5, 7, 8, 10, 12];

    const monthsWith30Days = [4, 6, 9, 11];

    if (month === 2) {
      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        return 29;
      } else {
        return 28;
      }
    }

    if (monthsWith31Days.includes(month)) {
      return 31;
    }

    if (monthsWith30Days.includes(month)) {
      return 30;
    }

    return 0;
  }
}
