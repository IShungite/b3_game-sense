import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { GradesService } from "./grades.service";
import { CreateGradeDto } from "./dto/create-grade.dto";
import { UpdateGradeDto } from "./dto/update-grade.dto";
import { Action } from "src/casl/casl-ability.factory";
import { CheckAbility } from "src/casl/casl-ability.decorator";
import { Grade } from "./schemas/grade.schema";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { AbilityGuard } from "src/casl/casl-ability.guard";

@UseGuards(JwtAuthGuard)
@Controller("grades")
export class GradesController {
  constructor(private readonly gradesService: GradesService) {}

  @Post()
  @UseGuards(AbilityGuard)
  @CheckAbility({ action: Action.Create, subject: Grade })
  create(@Body() createGradeDto: CreateGradeDto) {
    return this.gradesService.create(createGradeDto);
  }

  @Get(":id")
  @UseGuards(AbilityGuard)
  @CheckAbility({ action: Action.Read, subject: Grade })
  findOne(@Param("id") id: string) {
    return this.gradesService.findAllbyStudentID(id);
  }

  @Patch(":id")
  @UseGuards(AbilityGuard)
  @CheckAbility({ action: Action.Update, subject: Grade })
  update(@Param("id") id: string, @Body() updateGradeDto: UpdateGradeDto) {
    return this.gradesService.update(+id, updateGradeDto);
  }

  @Delete(":id")
  @UseGuards(AbilityGuard)
  @CheckAbility({ action: Action.Delete, subject: Grade })
  remove(@Param("id") id: string) {
    return this.gradesService.remove(+id);
  }
}
