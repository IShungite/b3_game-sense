import { ValidationShape } from "utils/validation";
import * as yup from "yup";
import { CreateAnswerDto } from "./create-answer.dto";

const createAnswerValidation = yup.object<ValidationShape<CreateAnswerDto>>({
  characterId: yup.string().required("Character ID is required"),
  quizId: yup.string().required("Quiz ID is required"),
  answers: yup.array().of(yup.number().typeError("Please choose an answer")),
});

export default createAnswerValidation;
