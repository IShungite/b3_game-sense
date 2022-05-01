import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateInventoryDto } from "./dto/create-inventory.dto";
import { Inventory } from "./schemas/inventory.schema";

@Injectable()
export class InventoriesService {
  constructor(@InjectModel(Inventory.name) private readonly inventoryModel: Model<Inventory>) {}
  async create(createInventoryDto: CreateInventoryDto) {
    const inventoryExists = await this.inventoryModel
      .findOne({
        characterId: createInventoryDto.characterId,
        productId: createInventoryDto.productId,
      })
      .exec();

    if (inventoryExists) throw new ConflictException("Inventory item already exists");

    const createdItem = new this.inventoryModel({
      ...createInventoryDto,
    });

    return createdItem.save();
  }

  findAll(): Promise<Inventory[]> {
    return this.inventoryModel.find().exec();
  }

  async findAllById(characterId: string): Promise<Inventory[]> {
    return this.inventoryModel.find({ characterId }).exec();
  }

  remove(id: string) {
    return `This action removes a #${id} inventory`;
  }
}
