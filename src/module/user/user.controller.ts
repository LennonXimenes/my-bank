import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseUUIDPipe,
	Patch,
	Post,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create.dto";
import { UpdateUserDto } from "./dto/update.dto";
import { UserService } from "./user.service";
import { ResponseUserDto } from "./dto/response.dto";

@Controller("user")
export class UserController {
	constructor(private readonly service: UserService) {}

	@Post("create")
	createUser(@Body() dto: CreateUserDto): Promise<ResponseUserDto> {
		return this.service.createUser(dto);
	}

	@Patch("update/:id")
	updateUser(
		@Param("id", ParseUUIDPipe) id: string,
		@Body() dto: UpdateUserDto,
	) {
		return this.service.updateUser(id, dto);
	}

	@Delete("delete/:id")
	deleteUser(@Param("id", ParseUUIDPipe) id: string) {
		return this.service.deleteUser(id);
	}

	@Get("find")
	findAll() {
		return this.service.findAll();
	}
}
