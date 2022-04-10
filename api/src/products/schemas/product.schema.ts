import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, ObjectId, SchemaTypes } from "mongoose";
import { Category } from "src/categories/schemas/category.schema";
import { Shop } from "src/shops/schemas/shop.schema";

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ type: SchemaTypes.ObjectId, auto: true })
  _id: ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: "Shop", required: true })
  shopId: Shop;

  @Prop({ type: SchemaTypes.ObjectId, ref: "Category", required: true })
  categoryId: Category;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: String, required: true })
  description: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
