import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, ObjectId, SchemaTypes } from "mongoose";

export type ShopDocument = Shop & Document;

@Schema()
export class Shop {
  @Prop({ type: SchemaTypes.ObjectId, auto: true })
  _id: ObjectId;

  @Prop({ type: String, required: true })
  name: string;
}

export const ShopSchema = SchemaFactory.createForClass(Shop);
