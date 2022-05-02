import { Controller, Get, Param, Delete } from "@nestjs/common";
import { InventoriesService } from "./inventories.service";
@Controller("inventories")
export class InventoriesController {
  constructor(private readonly inventoriesService: InventoriesService) {}

  @Get(":characterId")
  findAllById(@Param("characterId") characterId: string) {
    return this.inventoriesService.findAll({ characterId });
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.inventoriesService.remove(id);
  }
}
