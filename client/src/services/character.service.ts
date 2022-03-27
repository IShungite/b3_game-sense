import CreateCharacterDto from "models/characters/create-character.dto";
import api from "../api";

const createCharacter = async (formData: CreateCharacterDto) => (await api.createCharacter(formData)).data;

const getCharacters = async () => (await api.getCharacters()).data;

export default { createCharacter, getCharacters };
