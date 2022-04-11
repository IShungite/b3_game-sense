import { CreateSubjectDto } from "models/subjects/create-subject.dto";
import api from "../api";

const createSubject = async (createSubjectDto: CreateSubjectDto) => (await api.createSubject(createSubjectDto)).data;

const getSubjects = async (courseId: string) => (await api.getSubjects(courseId)).data;

export default { createSubject, getSubjects };
