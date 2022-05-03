import api from "api";

const getProducts = async () => (await api.getProducts()).data;

const getProductsByCategory = async (shopId: string, categoryId: string) =>
  (await api.getProductsByCategory(shopId, categoryId)).data;

export default {
  getProducts,
  getProductsByCategory,
};
