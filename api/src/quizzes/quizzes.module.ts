import { Module } from "@nestjs/common";
import { QuizzesService } from "./quizzes.service";
import { QuizzesController } from "./quizzes.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Quiz, QuizSchema } from "./schema/quiz.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: Quiz.name, schema: QuizSchema }])],
  controllers: [QuizzesController],
  providers: [QuizzesService],
})
export class QuizzesModule {}
