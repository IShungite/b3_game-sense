import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateCharacterDto } from "./dto/create-character.dto";
import { UpdateCharacterDto } from "./dto/update-character.dto";
import { Character } from "./schemas/character.schema";

@Injectable()
export class CharactersService {
  constructor(@InjectModel(Character.name) private readonly characterModel: Model<Character>) {}

  async create(createCharacterDto: CreateCharacterDto) {
    const characterExists = this.characterModel.findOne({
      nickname: createCharacterDto.nickname,
    });

    if (characterExists) throw new ConflictException("Nickname already exists");

    const createdCharacter = new this.characterModel({
      ...createCharacterDto,
      experience: 0,
      gold: 0,
      level: 1,
    });

    return createdCharacter.save();
  }

  findAll() {
    return `This action returns all characters`;
  }

  findOne(id: number) {
    return `This action returns a #${id} character`;
  }

  update(id: number, updateCharacterDto: UpdateCharacterDto) {
    return `This action updates a #${id} character`;
  }

  remove(id: number) {
    return `This action removes a #${id} character`;
  }
}
