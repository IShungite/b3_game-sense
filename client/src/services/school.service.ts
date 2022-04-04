import { CreateSchoolDto } from "models/schools/create-school.dto";
import api from "../api";

const createSchool = async (formData: CreateSchoolDto) => (await api.createSchool(formData)).data;

const getSchools = async () => (await api.getSchools()).data;

export default { createSchool, getSchools };
