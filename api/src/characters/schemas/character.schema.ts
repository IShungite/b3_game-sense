import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, ObjectId, SchemaTypes } from "mongoose";
import { Promotion } from "src/promotions/entities/promotion.schema";
import { School } from "src/schools/entities/school.schema";
import { User } from "src/users/schemas/user.schema";

export type CharacterDocument = Character & Document;

@Schema()
export class Character {
  @Prop({ type: SchemaTypes.ObjectId, auto: true })
  _id: ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: "User" })
  userId: User;

  @Prop({ type: String, required: true, unique: true })
  nickname: string;

  @Prop({ type: Number, required: true })
  level: number;

  @Prop({ type: Number, required: true })
  experience: number;

  @Prop({ type: Number, required: true })
  gold: number;

  @Prop({ type: Object, required: true })
  equipments: CharacterEquipments;

  @Prop({ type: SchemaTypes.ObjectId, ref: "School" })
  schoolId: ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: "Promotion" })
  promotionId: ObjectId;
}

export const CharacterSchema = SchemaFactory.createForClass(Character);

export interface CharacterEquipments {
  bodyId: string;
  headId: string;
  faceId: string;
  leftArmId: string;
  leftHandId: string;
  leftLegId: string;
  rightArmId: string;
  rightHandId: string;
  rightLegId: string;
}
