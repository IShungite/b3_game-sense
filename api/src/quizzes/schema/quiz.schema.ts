import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, ObjectId, SchemaTypes } from "mongoose";

export type QuizDocument = Quiz & Document;

@Schema()
export class Quiz {
  @Prop({ type: SchemaTypes.ObjectId, auto: true })
  _id: ObjectId;

  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: "Subject", required: true })
  subjectId: ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: "User", required: true })
  professorId: ObjectId;

  @Prop({ type: Array, required: true })
  questions: Question[];
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);

export interface Question {
  question: string;
  answers: Answer[];
  correctAnswer: number;
}

export interface Answer {
  value: string;
}
