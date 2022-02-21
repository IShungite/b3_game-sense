import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { Shop } from './schemas/shop.schema';

@Injectable()
export class ShopsService {
  constructor(@InjectModel(Shop.name) private readonly shopModel: Model<Shop>) {}
  
  async create(createShopDto: CreateShopDto): Promise<Shop> {
    const shopExist = await this.shopModel.findOne({
      name: createShopDto.name,
    });

  if(shopExist) throw new ConflictException("Shop already exist.");

  const createdShop = new this.shopModel({
    ...CreateShopDto,
  });

  return createdShop.save();
  }

  findOne(id: number) {
    return `This action returns a #${id} shop`;
  }

  update(id: number, updateShopDto: UpdateShopDto) {
    return `This action updates a #${id} shop`;
  }

  remove(id: number) {
    return `This action removes a #${id} shop`;
  }
}
