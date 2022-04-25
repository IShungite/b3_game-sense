import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { SubjectsService } from "./subjects.service";
import { CreateSubjectDto } from "./dto/create-subject.dto";
import { UpdateSubjectDto } from "./dto/update-subject.dto";
import { GetUser } from "src/decorator/get-user.decorator";
import { IUserRequest } from "src/auth/models/auth.models";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("subjects")
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Post()
  create(@Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectsService.create(createSubjectDto);
  }

  @Post("/getAll")
  findAll(@Body() params: { promotionId: string }) {
    return this.subjectsService.findAll(params.promotionId);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/getProfessorSubjects")
  getProfessorSubjects(@GetUser() user: IUserRequest) {
    console.log("usedzadzar");
    return this.subjectsService.getProfessorSubjects(user.id);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.subjectsService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateSubjectDto: UpdateSubjectDto) {
    return this.subjectsService.update(+id, updateSubjectDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.subjectsService.remove(+id);
  }
}
