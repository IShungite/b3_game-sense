import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, ObjectId, SchemaTypes } from "mongoose";
import { School } from "src/schools/schemas/school.schema";

export type ShopDocument = Shop & Document;

@Schema()
export class Shop {
  @Prop({ type: SchemaTypes.ObjectId, auto: true })
  _id: ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: "School", required: true })
  school_id: School;

  @Prop({ type: String, required: true })
  name: string;
}

export const ShopSchema = SchemaFactory.createForClass(Shop);
