export interface IQuiz {
  _id: string;
  name: string;
  questions: IQuestion[];
}

export interface IQuestion {
  _id: string;
  question: string;
  answers: Answer[];
  correctAnswer: number;
}

export interface Answer {
  value: string;
}
