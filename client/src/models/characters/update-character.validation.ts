import { ValidationShape } from "utils/validation";
import * as yup from "yup";
import { CharacterEquipmentsValidation } from "./create-character.validation";
import UpdateCharacterDto from "./update-character.dto";

const updateCharacterValidationSchema = yup.object<ValidationShape<UpdateCharacterDto>>({
  equipments: CharacterEquipmentsValidation,
});

export default updateCharacterValidationSchema;
