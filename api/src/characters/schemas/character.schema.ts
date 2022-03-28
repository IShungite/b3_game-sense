import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, ObjectId, SchemaTypes } from "mongoose";
import { User } from "src/users/schemas/user.schema";

export type CharacterDocument = Character & Document;

@Schema()
export class Character {
  @Prop({ type: SchemaTypes.ObjectId, auto: true })
  _id: ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: "User" })
  userId: User;

  @Prop({ type: String, required: true })
  nickname: string;

  @Prop({ type: Number, required: true })
  level: number;

  @Prop({ type: Number, required: true, unique: true })
  experience: number;

  @Prop({ type: Number, required: true })
  gold: number;

  @Prop({ type: Object, required: true })
  equipments: CharacterEquipments;
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
