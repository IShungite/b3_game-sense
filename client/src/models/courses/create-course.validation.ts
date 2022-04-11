import { ValidationShape } from "utils/validation";
import * as yup from "yup";
import { CreateCourseDto } from "./create-course.dto";

const createCourseValidation = yup.object<ValidationShape<CreateCourseDto>>({
  name: yup.string().required("Name is required"),
  schoolId: yup.string().required("School ID is required").length(24, "School ID is invalid"),
});

export default createCourseValidation;
