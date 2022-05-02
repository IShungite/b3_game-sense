import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, ObjectId, SchemaTypes } from "mongoose";

export type InventoryDocument = Inventory & Document;

@Schema()
export class Inventory {
  @Prop({ type: SchemaTypes.ObjectId, auto: true })
  _id: ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: "Character" })
  characterId: ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: "Item" })
  itemId: ObjectId;
}

export const InventorySchema = SchemaFactory.createForClass(Inventory);
