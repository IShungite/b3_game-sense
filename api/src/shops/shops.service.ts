import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateShopDto } from "./dto/create-shop.dto";
import { UpdateShopDto } from "./dto/update-shop.dto";
import { Shop } from "./schemas/shop.schema";

@Injectable()
export class ShopsService {
  constructor(@InjectModel(Shop.name) private readonly shopModel: Model<Shop>) {}

  async create(createShopDto: CreateShopDto): Promise<Shop> {
    const shopExist = await this.shopModel.findOne({
      name: createShopDto.name,
      school_id: createShopDto.school_id,
    });

    if (shopExist) throw new ConflictException("Shop already exist.");

    const createdShop = new this.shopModel({
      ...createShopDto,
    });

    return createdShop.save();
  }

  async findOne(id: string): Promise<Shop> {
    return this.shopModel.findById(id).exec();
  }

  async findAll(): Promise<Shop[]> {
    return this.shopModel.find();
  }
  async update(id: string, updateShopDto: UpdateShopDto): Promise<Shop> {
    return this.shopModel.findByIdAndUpdate(id, updateShopDto, {
      new: true,
    });
  }

  async remove(id: string): Promise<void> {
    await this.shopModel.findByIdAndRemove(id);
  }
}
