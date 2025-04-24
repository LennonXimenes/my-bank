import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { iUser } from "../user/user.entity";
import { UserValidator } from "../user/user.validator";

@Injectable()
export class AuthService {
	constructor(
		private readonly userValidator: UserValidator,
		private readonly jwtService: JwtService,
	) {}

	async validateUser(email: string, password: string) {
		const user = await this.userValidator.verifyEmailExists(email);

		const isPasswordValid = await bcrypt.compare(password, user.password);

		if (!isPasswordValid) {
			return null;
		}

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password: _, ...result } = user;
		return result;
	}

	async login(user: iUser) {
		const payload = { email: user.email, sub: user.id };

		return {
			access_token: this.jwtService.sign(payload),
		};
	}
}
