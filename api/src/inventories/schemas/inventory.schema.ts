import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, ObjectId, SchemaTypes } from "mongoose";

import { Character } from "src/characters/schemas/character.schema";
import { Product } from "src/products/schemas/product.schema";

export type InventoryDocument = Inventory & Document;

@Schema()
export class Inventory {
  @Prop({ type: SchemaTypes.ObjectId, auto: true })
  _id: ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: "Character" })
  characterId: Character;

  @Prop({ type: SchemaTypes.ObjectId, ref: "Product" })
  productId: Product;
}

export const InventorySchema = SchemaFactory.createForClass(Inventory);
