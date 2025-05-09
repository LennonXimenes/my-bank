import { randomUUID } from "crypto";

export abstract class BaseEntity {
	public id: string;
	public created_at: Date;
	public updated_at: Date;
	public deleted_at: Date | null;

	protected constructor(id: string) {
		this.id = id ?? randomUUID();
		this.created_at = new Date();
		this.updated_at = new Date();
		this.deleted_at = null;
	}

	setUpdatedAt() {
		this.updated_at = new Date();
	}

	setDeletedAt(deleted: boolean) {
		this.deleted_at = deleted ? new Date() : null;
	}
}
