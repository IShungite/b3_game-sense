import { ValidationShape } from "utils/validation";
import * as yup from "yup";
import { CreateQuizDto } from "./create-quiz.dto";

const createQuizValidation = yup.object<ValidationShape<CreateQuizDto>>({
  title: yup.string().required("Title is required"),
  questions: yup.array().of(
    yup.object({
      question: yup.string().required("Question is required"),
      answers: yup
        .array()
        .of(yup.object({ value: yup.string().required("Value is required") }).required("Answer is required")),
      correctAnswer: yup.number().required("Correct answer is required"),
    }),
  ),
});

export default createQuizValidation;
