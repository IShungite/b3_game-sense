import { Controller, Get, Post, Body, Param, Delete } from "@nestjs/common";
import { InventoriesService } from "./inventories.service";
import { CreateInventoryDto } from "./dto/create-inventory.dto";

@Controller("inventories")
export class InventoriesController {
  constructor(private readonly inventoriesService: InventoriesService) {}

  @Post()
  create(@Body() createInventoryDto: CreateInventoryDto) {
    return this.inventoriesService.create(createInventoryDto);
  }

  @Get()
  findAll() {
    return this.inventoriesService.findAll();
  }

  @Get(":characterId")
  findAllById(@Param("characterId") characterId: string) {
    return this.inventoriesService.findAllById(characterId);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.inventoriesService.remove(id);
  }
}
