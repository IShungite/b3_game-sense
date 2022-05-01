import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateItemDto } from "./dto/create-item.dto";
import { UpdateItemDto } from "./dto/update-item.dto";
import { Item } from "./schemas/item.schema";
import IStarterItems from "./schemas/starterList";

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

  async findStarterItems(): Promise<IStarterItems> {
    const starterItems: IStarterItems = {
      body: [],
      face: [],
      head: [],
      leftArm: [],
      leftHand: [],
      leftLeg: [],
      rightArm: [],
      rightHand: [],
      rightLeg: [],
    };
    const result = await this.itemModel.find({ isStarter: true }).exec();
    result.forEach((starterItem) => {
      starterItems[starterItem.type].push(starterItem);
    });
    return starterItems;
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
