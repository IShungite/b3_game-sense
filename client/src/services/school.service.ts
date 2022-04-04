import { CreateSchoolDto } from "models/schools/create-school.dto";
import api from "../api";

const createSchool = async (formData: CreateSchoolDto) => (await api.createSchool(formData)).data;

export default { createSchool };
