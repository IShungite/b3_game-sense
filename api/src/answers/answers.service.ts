import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { GradesService } from "src/grades/grades.service";
import { Quiz } from "src/quizzes/schema/quiz.schema";
import { CreateAnswerDto } from "./dto/create-answer.dto";
import { UpdateAnswerDto } from "./dto/update-answer.dto";
import { Answer } from "./schemas/answer.schema";

@Injectable()
export class AnswersService {
  constructor(
    @InjectModel(Answer.name) private readonly answerModel: Model<Answer>,
    @InjectModel(Quiz.name) private readonly quizModel: Model<Quiz>,
    private readonly gradesService: GradesService,
  ) {}
  async create(createAnswerDto: CreateAnswerDto): Promise<Answer> {
    const createdAnswer = await new this.answerModel({
      ...createAnswerDto,
    }).save();

    await this.autoCorrectAnswer(createdAnswer);

    return createdAnswer;
  }

  async findAll(filter?: FilterQuery<Answer>): Promise<Answer[]> {
    return this.answerModel.find(filter).exec();
  }

  async autoCorrectAnswer(answer: Answer) {
    const quiz = await this.quizModel.findById(answer.quizId).exec();

    let grade = 0;

    quiz.questions.forEach((question, index) => {
      if (question.correctAnswer === answer.answers[index]) {
        grade += 1;
      }
    });

    const finalGrade = parseInt(((grade * 20) / quiz.questions.length).toFixed(2));

    await this.gradesService.create({
      grade: finalGrade,
      characterId: answer.characterId.toString(),
      subjectId: quiz.subjectId.toString(),
      quizId: quiz._id.toString(),
    });
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
