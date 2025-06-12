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
import { CreateUserWithAccountService } from "./application/create-user-with-account.service";

@Controller("user")
export class UserController {
  constructor(
    private readonly service: UserService,
    private readonly createUserWithAccountService: CreateUserWithAccountService,
  ) {}

  @Post()
  async create(@Body() body: CreateUserDto): Promise<ResponseUserDto> {
    return await this.createUserWithAccountService.execute(body);
  }

  @Patch("update/:id") //TODO remover seguir o REST
  updateUser(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<any> {
    return this.service.updateUser(id, dto);
  }

  @Delete("delete/:id") //TODO remover seguir o REST
  deleteUser(@Param("id", ParseUUIDPipe) id: string): Promise<any> {
    return this.service.deleteUser(id);
  }

  @Get("find") //TODO remover seguir o REST
  findAll(): Promise<any> {
    return this.service.findAll();
  }
}
