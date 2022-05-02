import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, ObjectId, SchemaTypes } from "mongoose";
import { Shop } from "src/shops/schemas/shop.schema";

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  @Prop({ type: SchemaTypes.ObjectId, auto: true })
  _id: ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: "Shop", required: true })
  shopId: Shop;

  @Prop({ type: String, required: true })
  name: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
