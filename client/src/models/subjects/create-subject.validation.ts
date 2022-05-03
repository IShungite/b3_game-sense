import { ValidationShape } from "utils/validation";
import * as yup from "yup";
import { CreateSubjectDto } from "./create-subject.dto";

const createSubjectValidation = yup.object<ValidationShape<CreateSubjectDto>>({
  name: yup.string().required("Name is required"),
  promotionId: yup.string().required("Promotion ID is required").length(24, "Promotion ID is invalid"),
  professorId: yup.string().required("Professor ID is required").length(24, "Professor ID is invalid"),
  semester: yup
    .number()
    .required("Semester is required")
    .min(1, "Semester must be greater than 0")
    .max(2, "Semester must be less than 3"),
});

export default createSubjectValidation;
