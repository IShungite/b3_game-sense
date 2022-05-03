import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { IUserRequest } from "src/auth/models/auth.models";
import { CreateCharacterDto } from "./dto/create-character.dto";
import { UpdateCharacterDto } from "./dto/update-character.dto";
import { ProductsService } from "src/products/products.service";
import { Character, CharacterEquipments } from "./schemas/character.schema";
import { InventoriesService } from "src/inventories/inventories.service";

@Injectable()
export class CharactersService {
  constructor(
    @InjectModel(Character.name) private readonly characterModel: Model<Character>,
    private readonly productsService: ProductsService,
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

  findAll(userId: string): Promise<Character[]> {
    return this.characterModel.find({ userId }).exec();
  }

  async findOne(findOptions?: FilterQuery<Character>): Promise<Character> {
    if (findOptions !== undefined)
      Object.keys(findOptions).forEach((key) => findOptions[key] === undefined && delete findOptions[key]);
    return this.characterModel.findOne({ ...findOptions }).exec();
  }

  findAllFromPromotion(promotionId: string): Promise<Character[]> {
    return this.characterModel.find({ promotionId }).exec();
  }

  async updateGold(id: string, price: number): Promise<Character> {
    const character = await this.characterModel
      .findOne({
        _id: id,
      })
      .exec();

    const balance = character.gold;

    if (balance < price) throw new UnauthorizedException("Item is too expensive");

    const newValue = balance - price;

    const updateCharacterDto: UpdateCharacterDto = {
      gold: newValue,
    };

    return this.characterModel.findByIdAndUpdate(id, updateCharacterDto, {
      new: true,
    });
  }

  async addStarterItemsToInventory(characterId: string, equipments: CharacterEquipments) {
    const createInventoryItemPromises = [];
    for (const key in equipments) {
      if (Object.prototype.hasOwnProperty.call(equipments, key)) {
        const itemId: string = equipments[key];
        createInventoryItemPromises.push(
          this.inventoriesService.addItem({
            characterId,
            itemId,
          }),
        );
      }
    }
    await Promise.all(createInventoryItemPromises);
  }

  async update(id: string, updateCharacterDto: UpdateCharacterDto): Promise<Character> {
    return this.characterModel.findByIdAndUpdate(id, updateCharacterDto, { new: true });
  }

  remove(id: number) {
    return `This action removes a #${id} character`;
  }

  async buyItem(characterId: string, productId: string) {
    const product = await this.productsService.findOne(productId);
    if (!product) throw new NotFoundException("Product not found.");

    const updatedCharacter = await this.updateGold(characterId, product.price);

    await this.inventoriesService.addItem({
      characterId,
      itemId: product.itemId.toString(),
    });
    return updatedCharacter;
  }
}
