import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, ObjectId, SchemaTypes } from "mongoose";
import { Promotion } from "src/promotions/entities/promotion.schema";

export type SubjectDocument = Subject & Document;

@Schema()
export class Subject {
  @Prop({ type: SchemaTypes.ObjectId, auto: true })
  _id: ObjectId;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({type: SchemaTypes.ObjectId, ref: 'Promotion'})
  promotion_id: Promotion




  


}

export const SubjectSchema = SchemaFactory.createForClass(Subject);
