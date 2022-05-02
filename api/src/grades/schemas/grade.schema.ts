import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, ObjectId, SchemaTypes } from "mongoose";

export type GradeDocument = Grade & Document;

@Schema()
export class Grade {
  @Prop({ type: SchemaTypes.ObjectId, auto: true })
  _id: ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: "Character" })
  characterId: ObjectId;

  @Prop({ type: Number, required: true })
  grade: number;

  @Prop({ type: SchemaTypes.ObjectId, ref: "Subject" })
  subjectId: ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: "Quiz" })
  quizId: ObjectId;

  // TODO CreatedAt : date
}

export const GradeSchema = SchemaFactory.createForClass(Grade);
