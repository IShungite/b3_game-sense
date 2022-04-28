import { Module } from "@nestjs/common";
import { QuizzesService } from "./quizzes.service";
import { QuizzesController } from "./quizzes.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Quiz, QuizSchema } from "./schema/quiz.schema";
import { CharactersModule } from "src/characters/characters.module";
import { SubjectsModule } from "src/subjects/subjects.module";

@Module({
  imports: [MongooseModule.forFeature([{ name: Quiz.name, schema: QuizSchema }]), CharactersModule, SubjectsModule],
  controllers: [QuizzesController],
  providers: [QuizzesService],
})
export class QuizzesModule {}
