import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreatePromotionDto } from "./dto/create-promotion.dto";
import { UpdatePromotionDto } from "./dto/update-promotion.dto";
import { Promotion } from "./entities/promotion.schema";

@Injectable()
export class PromotionsService {
  constructor(@InjectModel(Promotion.name) private readonly promotionModel: Model<Promotion>) {}

  async create(createPromotionDto: CreatePromotionDto): Promise<Promotion> {
    const promotionExists = await this.promotionModel
      .findOne({ name: createPromotionDto.name, schoolId: createPromotionDto.schoolId })
      .exec();

    if (promotionExists) throw new ConflictException("Promotion already exists");

    const createdPromotion = new this.promotionModel({
      ...createPromotionDto,
    });

    return createdPromotion.save();
  }

  findAll(schoolId: string) {
    return this.promotionModel.find({ schoolId });
  }

  findOne(id: number) {
    return `This action returns a #${id} promotion`;
  }

  update(id: number, updatePromotionDto: UpdatePromotionDto) {
    return `This action updates a #${id} promotion`;
  }

  remove(id: number) {
    return `This action removes a #${id} promotion`;
  }
}
