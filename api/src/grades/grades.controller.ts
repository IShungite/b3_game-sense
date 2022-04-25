import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from "@nestjs/common";
import { GradesService } from "./grades.service";
import { CreateGradeDto } from "./dto/create-grade.dto";
import { UpdateGradeDto } from "./dto/update-grade.dto";
import { Grade } from "./schemas/grade.schema";
import { VerifyOwnedCharacterGuards } from "src/characters/verify-owned-character.guard";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller("grades")
export class GradesController {
  constructor(private readonly gradesService: GradesService) {}

  @Post()
  create(@Body() createGradeDto: CreateGradeDto) {
    return this.gradesService.create(createGradeDto);
  }
  @Post("getAll")
  @UseGuards(VerifyOwnedCharacterGuards)
  findAll(
    @Query("promotionId") promotionId: string,
    @Query("subject_id") subject_id: string,
    @Query("grade") grade: number,
    @Body("character_id") character_id: string,
  ): Promise<Grade[]> {
    return this.gradesService.findAll({ promotionId, subject_id, grade, character_id });
  }

  @Post("getAverage")
  @UseGuards(VerifyOwnedCharacterGuards)
  average(@Body("character_id") character_id: string) {
    console.log("test1");
    return this.gradesService.average(character_id);
  }

  @Get("student_id/:id")
  findOne(@Param("id") id: string) {
    return this.gradesService.findAllbyStudentID(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateGradeDto: UpdateGradeDto) {
    return this.gradesService.update(+id, updateGradeDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.gradesService.remove(+id);
  }
}
