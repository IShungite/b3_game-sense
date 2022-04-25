import { ValidationShape } from "utils/validation";
import * as yup from "yup";
import { CreateQuizDto } from "./create-quiz.dto";

const createQuizValidation = yup.object<ValidationShape<CreateQuizDto>>({
  name: yup.string().required("Name is required"),
  questions: yup.array().of(
    yup.object({
      question: yup.string().required("Question is required"),
      answers: yup
        .array()
        .of(yup.object({ value: yup.string().required("Value is required") }).required("Answer is required"))
        .length(2, "At least 2 answers are required"),
      correctAnswer: yup.number().required("Correct answer is required"),
    }),
  ),
});

export default createQuizValidation;
