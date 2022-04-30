import { ValidationShape } from "utils/validation";
import * as yup from "yup";
import CreateCharacterDto from "./create-character.dto";

const createCharacterValidationSchema = yup.object<ValidationShape<CreateCharacterDto>>({
  nickname: yup.string().required("Nickname is required"),
  equipments: yup
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
    .required("Equipments are required"),
});

export default createCharacterValidationSchema;
