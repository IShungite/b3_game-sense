import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, ObjectId, SchemaTypes } from "mongoose";
import { School } from "src/schools/entities/school.schema";

export type ClassDocument = Class & Document;

@Schema()
export class Class {
  @Prop({ type: SchemaTypes.ObjectId, auto: true })
  _id: ObjectId;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'School' })
  school_id: School

  


}

export const ClassSchema = SchemaFactory.createForClass(Class);
