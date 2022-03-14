import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common";
import { GradesService } from "./grades.service";
import { CreateGradeDto } from "./dto/create-grade.dto";
import { UpdateGradeDto } from "./dto/update-grade.dto";
import { Grade } from "./schemas/grade.schema";

@Controller("grades")
export class GradesController {
  constructor(private readonly gradesService: GradesService) {}

  @Post()
  create(@Body() createGradeDto: CreateGradeDto) {
    return this.gradesService.create(createGradeDto);
  }
  @Get("getAll")
  findAll(
    @Query("promotion_id") promotion_id: string,
    @Query("character_id") character_id: string,
    @Query("subject_id") subject_id: string,
    @Query("grade") grade: number,
  ): Promise<Grade[]> {
    return this.gradesService.findAll({ promotion_id, character_id, subject_id, grade });
  }
  @Get("getAverage")
  average() {
    return this.gradesService.average();
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
