import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";
import { Course } from "./entities/course.schema";

@Injectable()
export class CoursesService {
  constructor(@InjectModel(Course.name) private readonly courseModel: Model<Course>) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const courseExists = await this.courseModel
      .findOne({ name: createCourseDto.name, schoolId: createCourseDto.schoolId })
      .exec();

    if (courseExists) throw new ConflictException("Course already exists");

    const createdCourse = new this.courseModel({
      ...createCourseDto,
    });

    return createdCourse.save();
  }

  findAll(schoolId: string) {
    return this.courseModel.find({ schoolId });
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
