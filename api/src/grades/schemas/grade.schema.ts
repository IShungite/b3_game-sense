import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, ObjectId, SchemaTypes } from "mongoose";

import { Character } from "src/characters/schemas/character.schema";
import { Subject } from "src/subjects/entities/subject.schema";

export type GradeDocument = Grade & Document;

@Schema()
export class Grade {
  @Prop({ type: SchemaTypes.ObjectId, auto: true })
  _id: ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: "Character" })
  character_id: Character;

  @Prop({ type: Number, required: true })
  grade: number;

  @Prop({ type: SchemaTypes.ObjectId, ref: "Subject" })
  subject_id: Subject;

  // TODO CreatedAt : date
}

export const GradeSchema = SchemaFactory.createForClass(Grade);
