import { Module } from "@nestjs/common";
import { InventoriesService } from "./inventories.service";
import { InventoriesController } from "./inventories.controller";
import { Inventory, InventorySchema } from "./schemas/inventory.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { Item, ItemSchema } from "src/items/schemas/item.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Inventory.name, schema: InventorySchema },
      { name: Item.name, schema: ItemSchema },
    ]),
  ],
  controllers: [InventoriesController],
  providers: [InventoriesService],
  exports: [InventoriesService],
})
export class InventoriesModule {}
