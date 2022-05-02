import { Module } from "@nestjs/common";
import { InventoriesService } from "./inventories.service";
import { InventoriesController } from "./inventories.controller";
import { Inventory, InventorySchema } from "./schemas/inventory.schema";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [MongooseModule.forFeature([{ name: Inventory.name, schema: InventorySchema }])],
  controllers: [InventoriesController],
  providers: [InventoriesService],
  exports: [InventoriesService],
})
export class InventoriesModule {}
