import { Injectable, Query } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { CreateCharacterDto } from "./dto/create-character.dto";
import { UpdateCharacterDto } from "./dto/update-character.dto";
import { Character } from "./schemas/character.schema";

@Injectable()
export class CharactersService {
  constructor(@InjectModel(Character.name) private readonly characterModel: Model<Character>) {}

  create(createCharacterDto: CreateCharacterDto) {
    return "This action adds a new character";
  }

  findAll() {
    return `This action returns all characters`;
  }

  async findOne(findOptions?: FilterQuery<Character>): Promise<Character> {
    if (findOptions !== undefined)
      Object.keys(findOptions).forEach((key) => findOptions[key] === undefined && delete findOptions[key]);
    return this.characterModel.findOne({ ...findOptions }).exec();
  }

  update(id: number, updateCharacterDto: UpdateCharacterDto) {
    return `This action updates a #${id} character`;
  }

  remove(id: number) {
    return `This action removes a #${id} character`;
  }
}
