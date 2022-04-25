import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { SubjectsService } from "./subjects.service";
import { CreateSubjectDto } from "./dto/create-subject.dto";
import { UpdateSubjectDto } from "./dto/update-subject.dto";
import { VerifyOwnedCharacterGuards } from "src/characters/verify-owned-character.guard";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller("subjects")
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Post()
  create(@Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectsService.create(createSubjectDto);
  }

  @Get()
  // @UseGuards(VerifyOwnedCharacterGuards)
  findAll(@Body("promotionId") promotionId: string) {
    return this.subjectsService.findAll(promotionId);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.subjectsService.findOne(id);
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
