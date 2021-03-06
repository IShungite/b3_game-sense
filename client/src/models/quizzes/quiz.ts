export interface IQuiz {
  _id: string;
  title: string;
  subjectId: string;
  professorId: string;
  questions: IQuestion[];
}

export interface IQuestion {
  question: string;
  availableAnswers: AvailableAnswer[];
  correctAnswer: number;
}

export interface AvailableAnswer {
  value: string;
}

export interface IQuizWithoutCorrectAnswer extends Omit<IQuiz, "questions"> {
  questions: Omit<IQuestion, "correctAnswer">[];
}
