import { ValidationShape } from "utils/validation";
import * as yup from "yup";
import { CreateSubjectDto } from "./create-subject.dto";

const createSubjectValidation = yup.object<ValidationShape<CreateSubjectDto>>({
  name: yup.string().required("Name is required"),
  promotionId: yup.string().required("Promotion ID is required").length(24, "Promotion ID is invalid"),
});

export default createSubjectValidation;
