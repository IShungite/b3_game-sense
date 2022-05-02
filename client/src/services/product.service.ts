import api from "api";

const getProducts = async () => (await api.getProducts()).data;

const getProductsByCategory = async (categoryId: string) =>
  (await api.getProductsByCategory("TODO??", categoryId)).data;

export default {
  getProducts,
  getProductsByCategory,
};
