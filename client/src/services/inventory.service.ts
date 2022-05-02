import api from "api";

const getInventory = async (characterId: string) => (await api.getCharacterInventory(characterId)).data;

export default {
  getInventory,
};
