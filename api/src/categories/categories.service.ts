import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { Category } from "./schemas/category.schema";

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category.name) private readonly categoryModel: Model<Category>) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const categoryExist = await this.categoryModel.findOne({
      shop_id: createCategoryDto.shopId,
      name: createCategoryDto.name,
    });

    if (categoryExist) throw new ConflictException("Category already exist.");

    const createdCategory = new this.categoryModel({
      ...createCategoryDto,
    });

    return createdCategory.save();
  }

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find();
  }

  async findAllByShop(id: string): Promise<Category[]> {
    return this.categoryModel.find({ shopId: id });
  }

  async findOne(id: string): Promise<Category> {
    return this.categoryModel.findById(id).exec();
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    return this.categoryModel.findByIdAndUpdate(id, updateCategoryDto, {
      new: true,
    });
  }

  async remove(id: string): Promise<void> {
    await this.categoryModel.findByIdAndRemove(id);
  }
}
