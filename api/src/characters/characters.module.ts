import { Module } from "@nestjs/common";
import { CharactersService } from "./characters.service";
import { CharactersController } from "./characters.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Character, CharacterSchema } from "./schemas/character.schema";
import { ProductsModule } from "src/products/products.module";
import { InventoriesModule } from "src/inventories/inventories.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Character.name, schema: CharacterSchema }]),
    ProductsModule,
    InventoriesModule,
  ],
  controllers: [CharactersController],
  providers: [CharactersService],
  exports: [CharactersService],
})
export class CharactersModule {}
