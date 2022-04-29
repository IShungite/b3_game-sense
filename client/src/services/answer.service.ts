import { CreateAnswerDto } from "models/answers/create-answer.dto";
import api from "../api";

const createAnswer = async (createAnswerDto: CreateAnswerDto) => (await api.createAnswer(createAnswerDto)).data;

export default { createAnswer };
