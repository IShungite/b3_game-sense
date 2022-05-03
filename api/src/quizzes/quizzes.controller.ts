import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { QuizzesService } from "./quizzes.service";
import { CreateQuizDto } from "./dto/create-quiz.dto";
import { UpdateQuizDto } from "./dto/update-quiz.dto";
import { GetUser } from "src/decorator/get-user.decorator";
import { IUserRequest } from "src/auth/models/auth.models";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller("quizzes")
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Post()
  create(@Body() createQuizDto: CreateQuizDto, @GetUser() user: IUserRequest) {
    return this.quizzesService.create(user, createQuizDto);
  }

  @Post("/getByPromotion")
  findAllWithPromotionId(@Body("promotionId") promotionId: string) {
    return this.quizzesService.findAll({ promotionId });
  }

  @Post("/getByProfessor")
  findAllWithProfessorId(@GetUser() user: IUserRequest, @Body("subjectId") subjectId: string) {
    return this.quizzesService.findAll({ professorId: user.id, subjectId });
  }

  @Post("/getByCharacter")
  findAllWithStudentId(@Body("characterId") characterId: string) {
    return this.quizzesService.findAllCharacterQuizzes(characterId);
  }

  @Get("/getQuizWithoutCorrectAnswer/:id")
  findOneWithoutCorrectAnswer(@Param("id") id: string) {
    return this.quizzesService.findOneWithoutCorrectAnswer(id);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.quizzesService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateQuizDto: UpdateQuizDto) {
    return this.quizzesService.update(+id, updateQuizDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.quizzesService.remove(+id);
  }
}
