import CreateCharacterDto from "models/characters/create-character.dto";
import UpdateCharacterDto from "models/characters/update-character.dto";
import api from "../api";

const createCharacter = async (formData: CreateCharacterDto) => (await api.createCharacter(formData)).data;

const updateCharacter = async (characterId: string, updateCharacterDto: UpdateCharacterDto) =>
  (await api.updateCharacter(characterId, updateCharacterDto)).data;

const getCharacters = async () => (await api.getCharacters()).data;

const buyProduct = async (data: { characterId: string; productId: string }) => (await api.buyProduct(data)).data;

export default { createCharacter, updateCharacter, getCharacters, buyProduct };
