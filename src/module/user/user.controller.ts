import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./create.dto";

@Controller("user")
export class UserController {
	constructor(private readonly service: UserService) {}

	@Post("create")
	createUser(@Body() dto: CreateUserDto) {
		return this.service.createUser(dto);
	}

	@Get("find")
	findAll() {
		return this.service.findAll();
	}
}
