import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { SchoolsService } from "./schools.service";
import { CreateSchoolDto } from "./dto/create-school.dto";
import { UpdateSchoolDto } from "./dto/update-school.dto";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { GetUser } from "src/decorator/get-user.decorator";
import { IUserRequest } from "src/auth/models/auth.models";

@UseGuards(JwtAuthGuard)
@Controller("schools")
export class SchoolsController {
  constructor(private readonly schoolsService: SchoolsService) {}

  @Post()
  create(@Body() createSchoolDto: CreateSchoolDto) {
    return this.schoolsService.create(createSchoolDto);
  }

  @Get()
  findAll(@GetUser() user: IUserRequest) {
    return this.schoolsService.findAll(user.id);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.schoolsService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateSchoolDto: UpdateSchoolDto) {
    return this.schoolsService.update(+id, updateSchoolDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.schoolsService.remove(+id);
  }
}
