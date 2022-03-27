import CreateCharacterDto from "models/characters/create-character.dto";
import api from "../api";

const createCharacter = async (formData: CreateCharacterDto) => (await api.createCharacter(formData)).data;

export default { createCharacter };
