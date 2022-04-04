import { ValidationShape } from "utils/validation";
import * as yup from "yup";
import { CreateSchoolDto } from "./create-school.dto";

const createSchoolValidation = yup.object<ValidationShape<CreateSchoolDto>>({
  name: yup.string().required("Name is required"),
  directorId: yup.string().required("Director ID is required").length(24, "Director ID is invalid"),
});

export default createSchoolValidation;
