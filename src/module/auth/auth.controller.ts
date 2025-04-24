import {
	Body,
	Controller,
	Get,
	Post,
	Request,
	UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { JwtAuthGuard } from "./guard/jwt-auth.guard";
import { LocalAuthGuard } from "./guard/local-auth.guard";

@Controller("auth")
export class AuthController {
	constructor(private authService: AuthService) {}

	@UseGuards(LocalAuthGuard)
	@Post("login")
	login(@Body() dto: LoginDto) {
		return this.authService.login(dto);
	}

	@UseGuards(JwtAuthGuard)
	@Get("me")
	getProfile(@Request() req) {
		return req.user;
	}
}
