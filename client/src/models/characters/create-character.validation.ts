import { ValidationShape } from "utils/validation";
import * as yup from "yup";
import CreateCharacterDto from "./create-character.dto";

const createCharacterValidationSchema = yup.object<ValidationShape<CreateCharacterDto>>({
  nickname: yup.string().required("Nickname is required"),
  equipments: yup
    .object({
      bodyId: yup.number().required(),
      headId: yup.number().required(),
      faceId: yup.number().required(),
      leftArmId: yup.number().required(),
      leftHandId: yup.number().required(),
      leftLegId: yup.number().required(),
      rightArmId: yup.number().required(),
      rightHandId: yup.number().required(),
      rightLegId: yup.number().required(),
    })
    .required("Equipments are required"),
  schoolId: yup.string().required("School ID is required").length(24, "School ID is invalid"),
  promotionId: yup.string().required("Promotion ID is required").length(24, "Promotion ID is invalid"),
});

export default createCharacterValidationSchema;
