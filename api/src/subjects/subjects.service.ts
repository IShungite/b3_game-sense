import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateSubjectDto } from "./dto/create-subject.dto";
import { UpdateSubjectDto } from "./dto/update-subject.dto";
import { Subject } from "./entities/subject.schema";

@Injectable()
export class SubjectsService {
  constructor(@InjectModel(Subject.name) private readonly subjectModel: Model<Subject>) {}

  async create(createSubjectDto: CreateSubjectDto) {
    const subjectExists = await this.subjectModel
      .findOne({ name: createSubjectDto.name, promotionId: createSubjectDto.promotionId })
      .exec();

    if (subjectExists) throw new ConflictException("Subject already exists");

    const createdSubject = new this.subjectModel({
      ...createSubjectDto,
    });

    return createdSubject.save();
  }

  async findAll(promotionId: string) {
    return this.subjectModel.find({ promotionId }).exec();
  }

  getProfessorSubjects(professorId: string) {
    console.log(professorId);
    return this.subjectModel.find({ professorId });
  }

  findOne(id: number) {
    return `This action returns a #${id} subject`;
  }

  update(id: number, updateSubjectDto: UpdateSubjectDto) {
    return `This action updates a #${id} subject`;
  }

  remove(id: number) {
    return `This action removes a #${id} subject`;
  }
}
