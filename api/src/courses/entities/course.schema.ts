import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectId, SchemaTypes } from "mongoose";
import { School } from "src/schools/entities/school.schema";

export type CourseDocument = Course & Document;

@Schema()
export class Course {
  @Prop({ type: SchemaTypes.ObjectId, auto: true })
  _id: ObjectId;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: "School" })
  schoolId: School;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
