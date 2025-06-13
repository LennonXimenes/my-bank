import { randomUUID } from "crypto";

export abstract class BaseEntity {
  protected readonly id: string;
  protected readonly created_at: Date;
  protected updated_at: Date;
  protected deleted_at: Date | null;

  protected constructor() {
    this.id = randomUUID();
    this.created_at = new Date();
    this.updated_at = new Date();
    this.deleted_at = null;
  }

  protected setUpdatedAt(): void {
    this.updated_at = new Date();
  }

  protected setDeletedAt(deleted: boolean): void {
    this.deleted_at = deleted ? new Date() : null;
  }

  public getId(): string {
    return this.id;
  }

  public getCreatedAt(): Date {
    return this.created_at;
  }

  public getUpdatedAt(): Date {
    return this.updated_at;
  }

  public getDeletedAt(): Date | null {
    return this.deleted_at;
  }
}
