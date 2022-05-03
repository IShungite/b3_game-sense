import { Module } from "@nestjs/common";
import { QuizzesService } from "./quizzes.service";
import { QuizzesController } from "./quizzes.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Quiz, QuizSchema } from "./schema/quiz.schema";
import { CharactersModule } from "src/characters/characters.module";
import { SubjectsModule } from "src/subjects/subjects.module";
import { AnswersModule } from "src/answers/answers.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Quiz.name, schema: QuizSchema }]),
    CharactersModule,
    SubjectsModule,
    AnswersModule,
  ],
  controllers: [QuizzesController],
  providers: [QuizzesService],
  exports: [QuizzesService],
})
export class QuizzesModule {}
