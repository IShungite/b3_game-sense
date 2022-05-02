import { Controller, Get, Post, Body, Param, Delete, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { IUserRequest } from "src/auth/models/auth.models";
import { GetUser } from "src/decorator/get-user.decorator";
import { CharactersService } from "./characters.service";
import { CreateCharacterDto } from "./dto/create-character.dto";

@UseGuards(JwtAuthGuard)
@Controller("characters")
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Post()
  create(@GetUser() user: IUserRequest, @Body() createCharacterDto: CreateCharacterDto) {
    return this.charactersService.create(user, createCharacterDto);
  }

  @Get()
  findAll(@GetUser() user: IUserRequest) {
    return this.charactersService.findAll(user);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.charactersService.findOne({ _id: id });
  }

  @Get("promotion/:id")
  findAllFromPromotion(@Param("id") promotionId: string) {
    return this.charactersService.findAllFromPromotion(promotionId);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.charactersService.remove(+id);
  }

  @Post("/buyItem")
  buyItem(@Body("characterId") characterId: string, @Body("productId") productId: string) {
    return this.charactersService.buyItem(characterId, productId);
  }
}
