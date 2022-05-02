import { ValidationShape } from "utils/validation";
import * as yup from "yup";
import CreateCharacterDto from "./create-character.dto";

export const CharacterEquipmentsValidation = yup
  .object({
    bodyId: yup.string().required(),
    headId: yup.string().required(),
    faceId: yup.string().required(),
    leftArmId: yup.string().required(),
    leftHandId: yup.string().required(),
    leftLegId: yup.string().required(),
    rightArmId: yup.string().required(),
    rightHandId: yup.string().required(),
    rightLegId: yup.string().required(),
  })
  .required("Equipments are required");

const createCharacterValidationSchema = yup.object<ValidationShape<CreateCharacterDto>>({
  nickname: yup.string().required("Nickname is required"),
  equipments: CharacterEquipmentsValidation,
  schoolId: yup.string().required("School ID is required").length(24, "School ID is invalid"),
  promotionId: yup.string().required("Promotion ID is required").length(24, "Promotion ID is invalid"),
});

export default createCharacterValidationSchema;
