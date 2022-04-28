export interface IQuiz {
  _id: string;
  title: string;
  subjectId: string;
  professorId: string;
  questions: IQuestion[];
}

export interface IQuestion {
  question: string;
  answers: Answer[];
  correctAnswer: number;
}

export interface Answer {
  value: string;
}

export interface IQuizWithoutCorrectAnswer extends Omit<IQuiz, "questions"> {
  questions: Omit<IQuestion, "correctAnswer">[];
}
