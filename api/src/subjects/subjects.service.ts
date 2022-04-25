import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateSubjectDto } from "./dto/create-subject.dto";
import { UpdateSubjectDto } from "./dto/update-subject.dto";
import { Subject } from "./entities/subject.schema";

@Injectable()
export class SubjectsService {
  constructor(@InjectModel(Subject.name) private readonly subjectModel: Model<Subject>) {}

  create(createSubjectDto: CreateSubjectDto) {
    return "This action adds a new subject";
  }

  findAll(promotionId: string) {
    console.log(promotionId);
    return this.subjectModel.find({ promotionId }).exec();
  }

  findOne(id: string) {
    return this.subjectModel.findById(id).exec();
  }

  update(id: number, updateSubjectDto: UpdateSubjectDto) {
    return `This action updates a #${id} subject`;
  }

  remove(id: number) {
    return `This action removes a #${id} subject`;
  }
}
