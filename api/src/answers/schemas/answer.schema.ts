import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, ObjectId, SchemaTypes } from "mongoose";

import { Character } from "src/characters/schemas/character.schema";

export type AnswerDocument = Answer & Document;

@Schema()
export class Answer {
  @Prop({ type: SchemaTypes.ObjectId, auto: true })
  _id: ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: "Character" })
  characterId: Character;

  @Prop({ type: Array, required: true })
  answers: number[];

  @Prop({ type: SchemaTypes.ObjectId, ref: "Quiz" })
  quizId: ObjectId;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
