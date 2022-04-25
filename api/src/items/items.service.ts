import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateItemDto } from "./dto/create-item.dto";
import { UpdateItemDto } from "./dto/update-item.dto";
import { Item } from "./schemas/item.schema";

@Injectable()
export class ItemsService {
  constructor(@InjectModel(Item.name) private readonly itemModel: Model<Item>) {}
  async create(createItemDto: CreateItemDto) {
    const itemExists = await this.itemModel
      .findOne({
        name: createItemDto.name,
      })
      .exec();

    if (itemExists) throw new ConflictException("Name already exists");

    const createdItem = new this.itemModel({
      ...createItemDto,
    });

    return createdItem.save();
  }

  findAll(): Promise<Item[]> {
    return this.itemModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} item`;
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    return `This action updates a #${id} item`;
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
