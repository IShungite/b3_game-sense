import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { CoursesService } from "./courses.service";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";

@Controller("courses")
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Post("/getAll")
  findAll(@Body() params: { schoolId: string }) {
    return this.coursesService.findAll(params.schoolId);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.coursesService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(+id, updateCourseDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.coursesService.remove(+id);
  }
}