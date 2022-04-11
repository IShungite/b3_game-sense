import { CreateCourseDto } from "models/courses/create-course.dto";
import api from "../api";

const createCourse = async (formData: CreateCourseDto) => (await api.createCourse(formData)).data;

const getCourses = async (schoolId: string) => (await api.getCourses(schoolId)).data;

export default { createCourse, getCourses };
