import { Module } from "@nestjs/common";
import { AnswersService } from "./answers.service";
import { AnswersController } from "./answers.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Answer, AnswerSchema } from "./schemas/answer.schema";
import { Quiz, QuizSchema } from "src/quizzes/schema/quiz.schema";
import { GradesModule } from "src/grades/grades.module";
import { CharactersModule } from "src/characters/characters.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Answer.name, schema: AnswerSchema },
      { name: Quiz.name, schema: QuizSchema },
    ]),
    GradesModule,
    CharactersModule,
  ],
  controllers: [AnswersController],
  providers: [AnswersService],
  exports: [AnswersService],
})
export class AnswersModule {}
