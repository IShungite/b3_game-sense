import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, ObjectId, SchemaTypes } from "mongoose";
import { Promotion } from "src/promotions/entities/promotion.schema";
import { School } from "src/schools/entities/school.schema";

export type CharacterDocument = Character & Document;

@Schema()
export class Character {
  @Prop({ type: SchemaTypes.ObjectId, auto: true })
  _id: ObjectId;

  @Prop({type: SchemaTypes.ObjectId, ref:'School'})
  school_id: School;

  @Prop({type: SchemaTypes.ObjectId, ref: 'Promotion'})
  promotion_id : Promotion;

  @Prop({ type: String, required: true })
  nickname: string;

  @Prop({ type: Number, required: true })
  level: number;

  @Prop({ type: Number, required: true, unique: true })
  experience: number;

  @Prop({ type: Number , required: true })
  gold: number;

  // TODO : add status


}

export const CharacterSchema = SchemaFactory.createForClass(Character);
