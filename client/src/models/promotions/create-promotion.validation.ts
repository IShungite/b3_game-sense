import { ValidationShape } from "utils/validation";
import * as yup from "yup";
import { CreatePromotionDto } from "./create-promotion.dto";

const createPromotionValidation = yup.object<ValidationShape<CreatePromotionDto>>({
  name: yup.string().required("Name is required"),
  schoolId: yup.string().required("School ID is required").length(24, "School ID is invalid"),
});

export default createPromotionValidation;
