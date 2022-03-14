import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Product } from "./schemas/product.schema";

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private readonly productModel: Model<Product>) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const productExist = await this.productModel.findOne({
      shop_id: createProductDto.shop_id,
      name: createProductDto.name,
      price: createProductDto.price,
      description: createProductDto.description,
    });

    if (productExist) throw new ConflictException("Product already exist.");

    const createdShop = new this.productModel({
      ...createProductDto,
    });

    return createdShop.save();
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: string) {
    return this.productModel.findById(id).exec();
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
