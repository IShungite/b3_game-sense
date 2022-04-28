import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { IUserRequest } from "src/auth/models/auth.models";
import { CreateQuizDto } from "./dto/create-quiz.dto";
import { UpdateQuizDto } from "./dto/update-quiz.dto";
import { Quiz } from "./schema/quiz.schema";

@Injectable()
export class QuizzesService {
  constructor(@InjectModel(Quiz.name) private readonly quizModel: Model<Quiz>) {}

  create(professor: IUserRequest, createQuizDto: CreateQuizDto) {
    const createdQuiz = new this.quizModel({
      ...createQuizDto,
      professorId: professor.id,
    });
    return createdQuiz.save();
  }

  async findAll(filter: FilterQuery<Quiz>): Promise<Quiz[]> {
    return this.quizModel.find(filter).exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} quiz`;
  }

  update(id: number, updateQuizDto: UpdateQuizDto) {
    return `This action updates a #${id} quiz`;
  }

  remove(id: number) {
    return `This action removes a #${id} quiz`;
  }
}
