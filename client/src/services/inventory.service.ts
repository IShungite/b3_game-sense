import api from "api";
import { CreateInventoryDto } from "models/inventory/create-inventory.dto";

const getInventory = async (characterId: string) => (await api.getCharacterInventory(characterId)).data;

const buyProduct = async (data: CreateInventoryDto) => (await api.buyItem(data)).data;

export default {
  getInventory,
  buyProduct,
};
