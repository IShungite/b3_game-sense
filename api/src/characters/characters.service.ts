import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { ConflictException, Injectable } from "@nestjs/common";
import { IUserRequest } from "src/auth/models/auth.models";
import { CreateCharacterDto } from "./dto/create-character.dto";
import { UpdateCharacterDto } from "./dto/update-character.dto";
import { Character, CharacterEquipments } from "./schemas/character.schema";
import { InventoriesService } from "src/inventories/inventories.service";

@Injectable()
export class CharactersService {
  constructor(
    @InjectModel(Character.name) private readonly characterModel: Model<Character>,
    private readonly inventoriesService: InventoriesService,
  ) {}

  async create(user: IUserRequest, createCharacterDto: CreateCharacterDto) {
    const characterExists = await this.characterModel
      .findOne({
        nickname: createCharacterDto.nickname,
      })
      .exec();

    if (characterExists) throw new ConflictException("Nickname already exists");

    const createdCharacter = new this.characterModel({
      ...createCharacterDto,
      userId: user.id,
      experience: 0,
      gold: 0,
      level: 1,
    });

    await this.addStarterItemsToInventory(createdCharacter._id.toString(), createCharacterDto.equipments);

    return createdCharacter.save();
  }

  findAll(user: IUserRequest): Promise<Character[]> {
    return this.characterModel.find({ userId: user.id }).exec();
  }

  async findOne(findOptions?: FilterQuery<Character>): Promise<Character> {
    if (findOptions !== undefined)
      Object.keys(findOptions).forEach((key) => findOptions[key] === undefined && delete findOptions[key]);
    return this.characterModel.findOne({ ...findOptions }).exec();
  }

  findAllFromPromotion(promotionId: string): Promise<Character[]> {
    return this.characterModel.find({ promotionId }).exec();
  }

  async addStarterItemsToInventory(characterId: string, equipments: CharacterEquipments) {
    const createInventoryItemPromises = [];
    for (const key in equipments) {
      if (Object.prototype.hasOwnProperty.call(equipments, key)) {
        const productId: string = equipments[key];
        createInventoryItemPromises.push(
          this.inventoriesService.create({
            characterId,
            productId,
          }),
        );
      }
    }
    await Promise.all(createInventoryItemPromises);
  }

  update(id: number, updateCharacterDto: UpdateCharacterDto) {
    return `This action updates a #${id} character`;
  }

  remove(id: number) {
    return `This action removes a #${id} character`;
  }
}
