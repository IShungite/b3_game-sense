import { ValidationShape } from "utils/validation";
import * as yup from "yup";
import { CreateQuizDto } from "./create-quiz.dto";

const createQuizValidation = yup.object<ValidationShape<CreateQuizDto>>({
  title: yup.string().required("Title is required"),
  questions: yup.array().of(
    yup.object({
      question: yup.string().required("Question is required"),
      availableAnswers: yup
        .array()
        .of(yup.object({ value: yup.string().required("Value is required") }).required("Answer is required")),
      correctAnswer: yup.number().typeError("Correct answer is required").required("Correct answer is required"),
    }),
  ),
});

export default createQuizValidation;
