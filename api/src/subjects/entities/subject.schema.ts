import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, ObjectId, SchemaTypes } from "mongoose";
import { Class } from "src/classes/entities/class.schema";

export type SubjectDocument = Subject & Document;

@Schema()
export class Subject {
  @Prop({ type: SchemaTypes.ObjectId, auto: true })
  _id: ObjectId;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({type: SchemaTypes.ObjectId, ref: 'Class'})
  class_id: Class




  


}

export const SubjectSchema = SchemaFactory.createForClass(Subject);
