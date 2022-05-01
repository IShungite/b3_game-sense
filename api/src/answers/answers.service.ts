import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { CreateAnswerDto } from "./dto/create-answer.dto";
import { UpdateAnswerDto } from "./dto/update-answer.dto";
import { Answer } from "./schemas/answer.schema";

@Injectable()
export class AnswersService {
  constructor(@InjectModel(Answer.name) private readonly answerModel: Model<Answer>) {}
  create(createAnswerDto: CreateAnswerDto) {
    const createdAnswer = new this.answerModel({
      ...createAnswerDto,
    });
    return createdAnswer.save();
  }

  async findAll(filter?: FilterQuery<Answer>): Promise<Answer[]> {
    return this.answerModel.find(filter).exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} answer`;
  }

  update(id: number, updateAnswerDto: UpdateAnswerDto) {
    return `This action updates a #${id} answer`;
  }

  remove(id: number) {
    return `This action removes a #${id} answer`;
  }
}
