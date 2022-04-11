import { ValidationShape } from "utils/validation";
import * as yup from "yup";
import { CreateSubjectDto } from "./create-subject.dto";

const createSubjectValidation = yup.object<ValidationShape<CreateSubjectDto>>({
  name: yup.string().required("Name is required"),
  courseId: yup.string().required("Course ID is required").length(24, "Course ID is invalid"),
});

export default createSubjectValidation;
