import { Prop, Schema } from "@nestjs/mongoose";

@Schema()
export class Shop {
    @Prop()
    name: string;
}