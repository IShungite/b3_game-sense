import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { Item } from "src/items/schemas/item.schema";
import { AddItemDto } from "./dto/add-item.dto";
import { Inventory } from "./schemas/inventory.schema";

@Injectable()
export class InventoriesService {
  constructor(
    @InjectModel(Inventory.name) private readonly inventoryModel: Model<Inventory>,
    @InjectModel(Item.name) private readonly itemModel: Model<Item>,
  ) {}

  async addItem(addItemDto: AddItemDto) {
    const itemAdded = new this.inventoryModel({
      ...addItemDto,
    });

    return itemAdded.save();
  }

  async findAll(filter: FilterQuery<Inventory>): Promise<Item[]> {
    const itemsInInventory = await this.inventoryModel.find(filter).exec();

    const itemsPromises = itemsInInventory.map(async (item) => {
      return this.itemModel.findById(item.itemId).exec();
    });

    return Promise.all(itemsPromises);
  }

  remove(id: string) {
    return `This action removes a #${id} inventory`;
  }
}
