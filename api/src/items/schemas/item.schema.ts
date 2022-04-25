import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, ObjectId, SchemaTypes } from "mongoose";

export type ItemDocument = Item & Document;

@Schema()
export class Item {
  @Prop({ type: SchemaTypes.ObjectId, auto: true })
  _id: ObjectId;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String, required: true })
  image: string;

  @Prop({ type: String, required: true })
  type: string;

  @Prop({ type: Boolean, required: true })
  isStarter: boolean;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
