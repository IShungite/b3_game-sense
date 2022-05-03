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
    @Query("subjectId") subjectId: string,
    @Query("grade") grade: number,
    @Body("characterId") characterId: string,
  ): Promise<Grade[]> {
    return this.gradesService.findAll({ promotionId, subjectId, grade, characterId });
  }

  @Post("getAverage")
  @UseGuards(VerifyOwnedCharacterGuards)
  totalAverage(@Body("characterId") characterId: string) {
    return this.gradesService.totalAverage(characterId);
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
