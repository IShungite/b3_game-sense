import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { CreateGradeDto } from "./dto/create-grade.dto";
import { UpdateGradeDto } from "./dto/update-grade.dto";
import { Grade } from "./schemas/grade.schema";

@Injectable()
export class GradesService {
  constructor(@InjectModel(Grade.name) private readonly gradeModel: Model<Grade>) {}

  create(createGradeDto: CreateGradeDto) {
    const createdGrade = new this.gradeModel({
      ...createGradeDto,
    });
    return createdGrade.save();
  }

  findAllbyStudentID(id: string) {
    return this.gradeModel
      .find({
        character_id: id,
      })
      .exec();
  }
  findAll(findOptions?: FilterQuery<Grade>): Promise<Grade[]> {
    if (findOptions !== undefined)
      Object.keys(findOptions).forEach((key) => findOptions[key] === undefined && delete findOptions[key]);

    return this.gradeModel.find({ ...findOptions }).exec();
  }
  findOne(id: number) {
    return `This action returns a #${id} grade`;
  }

  update(id: number, updateGradeDto: UpdateGradeDto) {
    return `This action updates a #${id} grade`;
  }

  remove(id: number) {
    return `This action removes a #${id} grade`;
  }
  async average(character_id: string) {
    const grades = await this.findAll({ character_id: character_id });

    if (grades.length === 0) {
      return 0;
    }

    let sum_grades = 0;
    let res = 0;

    grades.map((grade) => {
      sum_grades += grade.grade;
    });
    res = sum_grades / grades.length;
    return res;
  }
}
