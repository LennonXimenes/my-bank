import { randomUUID } from "crypto";

export class Generate {
	static uuid(): string {
		return randomUUID().toString();
	}
}
