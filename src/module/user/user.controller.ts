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

  @Patch(":id")
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() body: UpdateUserDto,
  ): Promise<ResponseUserDto> {
    return this.service.update(id, body);
  }

  @Delete(":id") //TODO remover seguir o REST
  deleteUser(@Param("id", ParseUUIDPipe) id: string): Promise<any> {
    return this.service.delete(id);
  }

  @Get("find") //TODO remover seguir o REST
  findAll(): Promise<any> {
    return this.service.findAll();
  }
}
