import api from "api";

const getCharacterInventory = async (characterId: string) => (await api.getCharacterInventory(characterId)).data;

export default {
  getCharacterInventory,
};
