import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, ObjectId, SchemaTypes } from "mongoose";
import { User } from "src/users/schemas/user.schema";

export type SchoolDocument = School & Document;

@Schema()
export class School {
  @Prop({ type: SchemaTypes.ObjectId, auto: true })
  _id: ObjectId;

  @Prop({ type: String, required: true, unique: true })
  name: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: "User" })
  directorId: User;
}

export const SchoolSchema = SchemaFactory.createForClass(School);
