import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { IUserRequest } from "src/auth/models/auth.models";
import { CharactersService } from "src/characters/characters.service";
import { SubjectsService } from "src/subjects/subjects.service";
import { UsersService } from "src/users/users.service";
import { CreateQuizDto } from "./dto/create-quiz.dto";
import { UpdateQuizDto } from "./dto/update-quiz.dto";
import { Quiz } from "./schema/quiz.schema";

@Injectable()
export class QuizzesService {
  constructor(
    @InjectModel(Quiz.name) private readonly quizModel: Model<Quiz>,
    private readonly subjectsService: SubjectsService,
    private readonly charactersService: CharactersService,
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

  async findAllCharacterQuizzes(characterId: string): Promise<Quiz[]> {
    const character = await this.charactersService.findOne(characterId);
    const subjects = await this.subjectsService.findAll(character.promotionId.toString());

    return this.quizModel
      .find({
        subjectId: { $in: subjects.map((subject) => subject._id) },
      })
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
