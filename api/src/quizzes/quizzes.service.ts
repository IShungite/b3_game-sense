import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { AnswersService } from "src/answers/answers.service";
import { IUserRequest } from "src/auth/models/auth.models";
import { CharactersService } from "src/characters/characters.service";
import { SubjectsService } from "src/subjects/subjects.service";
import { CreateQuizDto } from "./dto/create-quiz.dto";
import { UpdateQuizDto } from "./dto/update-quiz.dto";
import { Quiz } from "./schema/quiz.schema";

@Injectable()
export class QuizzesService {
  constructor(
    @InjectModel(Quiz.name) private readonly quizModel: Model<Quiz>,
    private readonly subjectsService: SubjectsService,
    private readonly charactersService: CharactersService,
    private readonly answersService: AnswersService,
  ) {}

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

  async findAllCharacterQuizzes(characterId: string): Promise<{ quizDone: Quiz[]; quizToDo: Quiz[] }> {
    const character = await this.charactersService.findOne({ _id: characterId });
    const subjects = await this.subjectsService.findAll(character.promotionId.toString());

    const quizzes = await this.quizModel
      .find({
        subjectId: { $in: subjects.map((subject) => subject._id) },
      })
      .select("-questions.correctAnswer") // remove correctAnswer from questions
      .exec();
    const characterAnswers = await this.answersService.findAll({
      characterId,
      quizId: { $in: quizzes.map((quiz) => quiz._id) },
    });

    const quizDone = [];
    const quizToDo = [];

    quizzes.forEach((quiz) => {
      const quizAnswer = characterAnswers.find((answer) => answer.quizId.toString() === quiz._id.toString());
      if (quizAnswer) {
        quizDone.push(quiz);
      } else {
        quizToDo.push(quiz);
      }
    });

    return { quizDone, quizToDo };
  }

  async findOneWithoutCorrectAnswer(id: string) {
    return this.quizModel
      .findById(id)
      .select("-questions.correctAnswer") // remove correctAnswer from questions
      .exec();
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
