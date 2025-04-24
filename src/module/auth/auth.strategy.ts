import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserValidator } from "../user/user.validator";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly userValidator: UserValidator) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_SECRET,
		});
	}

	async validate(payload: any) {
		// return { user_id: payload.sub, email: payload.email };
		return this.userValidator.verifyExists(payload.sub);
	}
}
