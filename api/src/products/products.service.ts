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

    const createdProduct = new this.productModel({
      ...createProductDto,
    });

    return createdProduct.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find();
  }

  async findOne(id: string): Promise<Product> {
    return this.productModel.findById(id).exec();
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    return this.productModel.findByIdAndUpdate(id, updateProductDto, {
      new: true,
    });
  }

  async remove(id: string): Promise<void> {
    await this.productModel.findByIdAndRemove(id);
  }
}
