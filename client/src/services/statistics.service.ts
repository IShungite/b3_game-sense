import { GradesBySubjectsData, GradesData } from "models/statistics/statistics";
import api from "../api";

// const register = async (formData: RegisterData) => {
//   await api.register({ ...formData, password: hash(formData.password) });
// };

// const login = async (formData: LoginData) => {
//   const user = (await api.login({ ...formData, password: hash(formData.password) })).data;

//   localStorage.setItem("user", JSON.stringify(user));

//   return user;
// };

// const logout = () => {
//   localStorage.removeItem("user");
//   return undefined;
// };

// export default {
//   register,
//   login,
//   logout,
// };

const getGrades = async (paramCharacterId: GradesData) => {
  const stats = (await api.getGrades({ ...paramCharacterId })).data;
  return stats;
};

const getAverage = async (paramCharacterId: GradesData) => {
  const average = (await api.getAverage({ ...paramCharacterId })).data;
  return average;
};

const getGradesBySubjects = async (paramsGrades: GradesBySubjectsData) => {
  const gradesresult = (await api.getGradesBySubjects({ ...paramsGrades })).data;
  return gradesresult;
};

export default { getGrades, getAverage, getGradesBySubjects };
